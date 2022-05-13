import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    'addMargin'
  );

  const tilesClasses = classNames(
    'tiles-wrap',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Meet the Team'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-right" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <Image
                  src={require('./../../assets/images/amara.png')}
                  alt="Features split 01"
                  width={528}
                  height={396} />
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">Amara Perry</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    Project Manager
                  </span>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-left" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <Image
                  src={require('./../../assets/images/faiza.png')}
                  alt="Features split 01"
                  width={528}
                  height={396} />
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">Faiza Hussain</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    UX Design/Research
                  </span>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-right" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <Image
                  src={require('./../../assets/images/ramiro.png')}
                  alt="Features split 01"
                  width={528}
                  height={396} />
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">Ramiro Steinmann Petrasso</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    Full Stack Developer
                  </span>
                </div>
              </div>
            </div>
            
            <div className="tiles-item reveal-from-left" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <Image
                  src={require('./../../assets/images/shourya.png')}
                  alt="Features split 01"
                  width={528}
                  height={396} />
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">Shourya Srivastava</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    Full Stack Developer
                  </span>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-top" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <Image
                  src={require('./../../assets/images/talin.png')}
                  alt="Features split 01"
                  width={528}
                  height={396} />
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                  <span className="testimonial-item-name text-color-high">Talin Hans</span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    Full Stack Developer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;