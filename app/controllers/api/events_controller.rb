class Api::EventsController < ApplicationController
  def index
    events = Event.all

    render json: {
      events: events
    }, status: :ok
  end

  def show
    event = Event.find(params[:event_id])

    render json: {
      event: event
    }, status: :ok
  end

  
  def create
    event = Event.new({
      name: params[:name],
      group: params[:group],
      image: params[:image],
      date: params[:date],
      description: params[:description],
      info: params[:info],
      price: params[:price],
      stock: params[:stock]
    })
    if event.save!
      render json: {event_saved: "save success"}, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

end
