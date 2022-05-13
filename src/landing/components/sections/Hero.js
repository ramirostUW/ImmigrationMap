import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import { absoluteLink } from '../../../App'

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
          {/* <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
            <pp2> Where do <span className="text-color-secondary">you</span> want to immigrate?            </pp2>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom text" data-reveal-delay="400"> <pp>
                View our interactive map to explore statistical information by category from various countries. </pp>
              </p> */}

              <div className="moveDown reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile href={absoluteLink("/site")}>
                    Get started
                    </Button>
                  <Button tag="a" color="secondary" wideMobile href="https://github.com/ramirostUW/ImmigrationMap">
                    View on Github
                    </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://www.youtube.com/watch?v=xddcKZSrLQM"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require('./../../assets/images/placeholder.png')}
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://www.youtube.com/watch?v=xddcKZSrLQM"
            videoTag="iframe" />
        </div>
        <p className="m-0 center-content ">
          Project Status: University of Washington Information School Capstone project for Winter/Spring 2022
</p>

<p className="m-0 center-content">
This project is now available as an open-source project on Github
</p>
        {/* </div> */}
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;