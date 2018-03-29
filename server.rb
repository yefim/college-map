require 'sinatra'
require 'rest-client'
require 'base64'

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

get '/' do
  erb :index
end

get '/map' do
  code = params['code']

  if code.nil? || code.length == 0
    redirect to('/')
    return
  end

  puts code

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

    auth_header = request.env['HTTP_AUTHORIZATION']

    args << {
      Authorization: auth_header.nil? ? "Basic #{ENCODED_CLIENT_CREDENTIALS}" : auth_header,
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
