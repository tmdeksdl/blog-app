import { useState } from 'react';
const IMAGE_1_URL =
  'https://images.unsplash.com/photo-1702295419742-02b462f93f20?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const IMAGE_2_URL =
  'https://images.unsplash.com/photo-1701198067567-24b886478206?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const IMAGE_3_URL =
  'https://images.unsplash.com/photo-1702750722257-6bc38db1267a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function Carousel() {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <>
      <div className="carousel">
        <ul className="carousel_slides">
          <input
            type="radio"
            name="radio_buttons"
            id="img_1"
            checked={activeImage === 1}
            readOnly
          />
          <li className="slide_container">
            <div className="slide_img">
              <img src={IMAGE_1_URL} alt="scene_1"></img>
            </div>
            <div className="carousel_controls">
              <label
                onClick={() => setActiveImage(3)}
                className="previous_slide"
              >
                <span>&lsaquo;</span>
              </label>

              <label onClick={() => setActiveImage(2)} className="next_slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input
            type="radio"
            name="radio_buttons"
            id="img_2"
            checked={activeImage === 2}
            readOnly
          ></input>
          <li className="slide_container">
            <div className="slide_img">
              <img src={IMAGE_2_URL} alt="scene_2"></img>
            </div>
            <div className="carousel_controls">
              <label
                onClick={() => setActiveImage(1)}
                className="previous_slide"
              >
                <span>&lsaquo;</span>
              </label>

              <label onClick={() => setActiveImage(3)} className="next_slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>

          <input
            type="radio"
            name="radio_buttons"
            id="img_3"
            checked={activeImage === 3}
            readOnly
          ></input>
          <li className="slide_container">
            <div className="slide_img">
              <img src={IMAGE_3_URL} alt="scene_3"></img>
            </div>
            <div className="carousel_controls">
              <label
                onClick={() => setActiveImage(2)}
                className="previous_slide"
              >
                <span>&lsaquo;</span>
              </label>

              <label onClick={() => setActiveImage(1)} className="next_slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>

          <div className="carousel_dots">
            <label
              onClick={() => setActiveImage(1)}
              className="carousel_dot"
              id="img_1_dot"
            ></label>
            <label
              onClick={() => setActiveImage(2)}
              className="carousel_dot"
              id="img_2_dot"
            ></label>
            <label
              onClick={() => setActiveImage(3)}
              className="carousel_dot"
              id="img_3_dot"
            ></label>
          </div>
        </ul>
      </div>
    </>
  );
}
