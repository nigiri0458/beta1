class UserMailer < ApplicationMailer
    default from: 'yuta0458@gmail.com'

    def purchase_mail
        @user = params[:user]
        mail(to: @user.email, subject: '<Handshake>抽選申し込み・購入を受け付けました')
    end

end
