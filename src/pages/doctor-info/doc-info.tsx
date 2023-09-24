import React, { useState } from "react";
import "./main.scss";
interface NewEmailProps { }
const DoctorInfo: React.FC<NewEmailProps> = () => {
    const [activeDays, setActiveDays] = useState<number | null>(null);
    const buttonLabels = [
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ];
    const handleButtonClick = (buttonIndex: number) => {
        setActiveDays(buttonIndex);
    };
    return (
        <div className="container">
            <div className="box">
                <div className="box-1">
                    <img
                        className="images"
                        src="https://i.pinimg.com/236x/0c/73/1c/0c731c592013f35a7bf0684981e3a5c9--medical-doctor-doctors.jpg"
                        alt=""
                    />
                </div>
                <div className="box-2">
                    <h1>Fullname Speciality Ta'lim(info)</h1>
                    <p className="tajribasi">umumiy ish tajribasi {14} yil</p>
                    <div className="info-box">
                        <p className="info">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque a
                            suscipit voluptates provident cum labore sed. Facere velit nulla
                            officiis accusantium possimus ratione minus incidunt, obcaecati
                            error tempore magni veritatis!
                        </p>
                        <p className="info">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
                            inventore ipsa iusto praesentium maiores, minima porro debitis
                            reprehenderit quam reiciendis! Blanditiis ducimus odit eius
                            pariatur aspernatur tempora dolorem ullam nostrum.
                        </p>
                        <p className="info">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
                            mollitia dicta numquam omnis nisi reiciendis illum earum fugit
                            quisquam nulla nesciunt, eaque vel nihil non delectus, officiis
                            iusto, amet quae.
                        </p>
                        <p className="info">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
                            mollitia dicta numquam omnis nisi reiciendis illum earum fugit
                            quisquam nulla nesciunt, eaque vel nihil non delectus, officiis
                            iusto, amet quae.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Similique deleniti explicabo quam quibusdam sed eius ipsam iusto
                            eveniet laudantium ad magnam corrupti expedita, praesentium iure,
                            reprehenderit est error quo! Doloribus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Similique deleniti explicabo quam quibusdam sed eius ipsam iusto
                            eveniet laudantium ad magnam corrupti expedita, praesentium iure,
                            reprehenderit est error quo! Doloribus.
                        </p>
                    </div>
                </div>
            </div>
            <div className="days">
                <p className="makeApoint">Make Appointment</p>
                <div>
                    {buttonLabels.map((label, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(index)}
                            className={activeDays === index ? 'active' : ''}
                        >
                            {label}
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button className="bookApoint">Book Appointment</button>


            </div>
        </div>
    );
};
export default DoctorInfo;