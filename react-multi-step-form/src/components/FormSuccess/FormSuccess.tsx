import React from "react";

const FormSuccess: React.FC = () => {
    return (<div data-form-success="" className="bg-white hidden absolute inset h-full w-full text-center z-30">
        <div
            className="flex flex-col justify-center items-center bg-gray-light w-full h-full rounded-16 p-32 sm--p-20 sm--rounded-12">
            <div className="vector-h-full h-52 mb-20">
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle cx="26" cy="26" r="26" fill="#1CCC5B"></circle>
                    <path
                        d="M22.5 30.5858L18.7071 26.7929C18.3166 26.4024 17.6834 26.4024 17.2929 26.7929C16.9024 27.1834 16.9024 27.8166 17.2929 28.2071L21.7929 32.7071C22.1834 33.0976 22.8166 33.0976 23.2071 32.7071L34.2071 21.7071C34.5976 21.3166 34.5976 20.6834 34.2071 20.2929C33.8166 19.9024 33.1834 19.9024 32.7929 20.2929L22.5 30.5858Z"
                        fill="white"></path>
                </svg>
            </div>
            <div className="heading-style-h3 mb-16">Ваша заявка успешно принята</div>
            <div className="max-w-450">
                <p>в&nbsp;ближайшее время с&nbsp;вами свяжется сотрудник банка и&nbsp;расскажет, как
                    оформить карту Humo без&nbsp;посещения офиса в&nbsp;течение 5&nbsp;минут</p>
            </div>
        </div>
    </div>);
}

export default FormSuccess;