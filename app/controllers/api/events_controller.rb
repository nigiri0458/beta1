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
end
