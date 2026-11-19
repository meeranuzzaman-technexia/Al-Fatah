import { useState } from "react";
import { Pill } from "./Pill.jsx";
import { serviceRows } from "../data.js";

export function ServicesSection({ onGetStarted }) {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="services-head reveal">
          <div>
            <p className="section-eyebrow">Services</p>
          </div>
          <h2 className="section-heading">
            How FIND
            <br />
            <span>Can Help You</span>
          </h2>
        </div>
        <div className="service-list reveal">
          {serviceRows.map((service, index) => (
            <button
              className={`service-row ${activeService === index ? "active" : ""}`}
              key={service.title}
              onMouseEnter={() => setActiveService(index)}
              onFocus={() => setActiveService(index)}
              onClick={() => {
                setActiveService(index);
                onGetStarted();
              }}
            >
              <div className="service-bg">
                <img src={service.image} alt="" loading="lazy" />
              </div>
              <div className="service-row-content">
                <div className="service-num">{String(index + 1).padStart(2, "0")}</div>
                <div className="service-copy">{service.copy}</div>
                <div className="service-word">{service.title}</div>
              </div>
            </button>
          ))}
        </div>
        <p className="services-brief reveal" data-word-wipe data-wipe-color="#ffffff" data-wipe-soft="rgba(255, 255, 255, 0.35)">
          Our certified agents guide you through every stage of real estate with expert knowledge and reliable
          support.
        </p>
        <div className="reveal">
          <Pill text="Get Started with FIND" variant="light" onClick={onGetStarted} />
        </div>
      </div>
    </section>
  );
}
