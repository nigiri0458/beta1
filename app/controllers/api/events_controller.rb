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

  def selected
    @@cart = []
    for n in 0..(@@cart_items.count - 1) do
      event = Event.find(@@cart_items[n].event_id)
      if event
        @@cart.push({"cart_item_id" => @@cart_item_ids[n], "event_id" => event.id, "event_name" => event.name, "event_image" => event.image, "quantity" => @@cart_items[n].quantity })
      else
        puts "error in events_show_added"
      end
    end
    render json: {cart: @@cart}, status: :ok
  end

  def create
    event = Event.new({
      name: params[:name],
      group: params[:group],
      image: params[:image],
      date: params[:date],
      description: params[:description],
      info: params[:info],
      price: params[:price]
    })
    if event.save!
      render json: {event_saved: "save success"}, status: :ok
    else
      render json: {}, status: :internal_server_error
    end
  end

end
