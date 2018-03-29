require 'sinatra'
require 'rest-client'
require 'base64'
require 'sysrandom/securerandom'

require_relative './secrets' if Pathname.new('./secrets.rb').exist?

CLIENT_ID = ENV['RAISEME_CLIENT_ID'] unless defined?(CLIENT_ID)
CLIENT_SECRET = ENV['RAISEME_CLIENT_SECRET'] unless defined?(CLIENT_SECRET)
BASE_URL = ENV['RAISEME_BASE_URL'] unless defined?(BASE_URL)
REDIRECT_URI = ENV['RAISEME_REDIRECT_URI'] unless defined?(REDIRECT_URI)

raise 'Missing RAISEME_CLIENT_ID' if CLIENT_ID.nil?
raise 'Missing RAISEME_CLIENT_SECRET' if CLIENT_SECRET.nil?
raise 'Missing RAISEME_BASE_URL' if BASE_URL.nil?
raise 'Missing RAISEME_REDIRECT_URI' if REDIRECT_URI.nil?

ENCODED_CLIENT_CREDENTIALS = Base64.strict_encode64("#{CLIENT_ID}:#{CLIENT_SECRET}")

set :bind, SERVER_IP if defined?(SERVER_IP)
set :port, SERVER_PORT if defined?(SERVER_PORT)
set :public_folder, Proc.new { File.join(root, 'dist') }
set :session_secret, ENV.fetch('SESSION_SECRET') { SecureRandom.hex(64) }
enable :sessions

get '/' do
  erb :index
end

get '/map' do
  code = params['code']

  if session[:access_token].nil? && code && code.length > 0
    res = RestClient.post("#{BASE_URL}/oauth/token", {
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }, {
      Authorization: "Basic #{ENCODED_CLIENT_CREDENTIALS}",
      accept: :json
    }).to_s

    session[:access_token] = JSON.parse(res)['access_token']
  end

  if session[:access_token].nil?
    redirect to('/')
    return
  end

  erb :map
end

# set up to forward any request other than "GET /" on to the BASE_URL
%i(get post patch put delete).each do |method|
  send(method, '/*') do
    path = params['splat'].first
    query = request.query_string

    args = [
      "#{BASE_URL}/#{path}#{"?#{query}" if query && query.length > 0}"
    ]

    if %i(post patch put).include?(method)
      args << begin
                JSON.parse(request.body.read)
              rescue JSON::ParserError
                {}
              end
    end

    access_token = session[:access_token]

    args << {
      Authorization: access_token.nil? ? "Basic #{ENCODED_CLIENT_CREDENTIALS}" : "Bearer #{access_token}",
      accept: :json
    }

    begin
      RestClient.public_send(method, *args).to_s
    rescue RestClient::Unauthorized
      halt 401
    rescue RestClient::NotFound
      halt 404
    end
  end
end
