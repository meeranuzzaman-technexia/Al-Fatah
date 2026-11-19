import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { testimonials } from "../data.js";

export function TestimonialsSection() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section className="section testimonials" id="reviews">
      <div className="container">
        <h2 className="section-heading reveal">
          Don’t Take <span className="muted">Our Word for It.</span>
        </h2>
        <div className="testimonials-grid">
          {/* image sits on the left, as on the live site */}
          <div className="testimonial-photo reveal">
            <img src="/images/1.52131ac7.webp" alt="Happy FIND clients" loading="lazy" />
          </div>

          <div className="reveal testimonials-col">
            <div className="review-swiper">
              <div className="review-bullets" role="tablist" aria-label="Reviews">
                {testimonials.map((review, index) => (
                  <button
                    key={review.author}
                    type="button"
                    role="tab"
                    aria-selected={reviewIndex === index}
                    className={`review-bullet ${reviewIndex === index ? "is-active" : ""}`}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                loop
                autoplay={{ delay: 6500, disableOnInteraction: false }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setReviewIndex(swiper.realIndex)}
              >
                {testimonials.map((review) => (
                  <SwiperSlide className="review-slide" key={review.author}>
                    <div>
                      <p className="review-quote">“{review.quote}”</p>
                    </div>
                    <div className="review-footer">
                      <span>{review.author}</span>
                      <span className="slash">/</span>
                      <span className="review-stars">★★★★★</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
