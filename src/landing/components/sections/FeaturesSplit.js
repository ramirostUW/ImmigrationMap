import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import { split } from 'lodash';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    'addMargin2'  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Process',
    
  };

  const sectionHeader2 = {
    title: 'Benefits',
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>

          <div className={splitClasses}>

          <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <h3 className="mt-0 mb-12">
                  About Us
                  </h3>
                <p className="m-0">
                Immigrants need as much information as possible when adapting to a new
country to combat differences in culture and transition smoothly. Without appropriate research, they can face barriers in accessing basic needs and are often subject to exploitation. 

Immigration Inc. is an interactive website providing knowledge and resources for those interested in moving out of their home countries. Through data visualizations powered by government statistics covering topics such as education, employment, and population, Immigration Inc. enables users to make informed decisions regarding immigration.
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill', 
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/passport.png')}
                  alt="passport"
                  width={297}
                  height={223}
                   />
              </div>
            </div>
          
          <SectionHeader data={sectionHeader} className="center-content" />

          <p className="m-0 center-content">
            Market Research → Literature Review → Survey Research → Data Analysis → User Persona Development
          </p>
          <p className="m-0 center-content marginBottom">
            → Brainstorming/Prototyping → Minimal Viable Product Development → Usability Testing → Final Product Development
          </p>
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Easily find your destination
                  </div>
                <h3 className="mt-0 mb-12">
                  Dynamic World Country Map
                  </h3>
                <p className="m-0">
                Explore multiple countries to compare information and quality of living
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/features-split-image-01.png')}
                  alt="Features split 01"
                  width={528}
                  height={396} />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Wide array of information
                  </div>
                <h3 className="mt-0 mb-12">
                  Information by Category
                  </h3>
                <p className="m-0">
                Navigate categories to learn about the statistics of the country
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/features-split-image-02.png')}
                  alt="Features split 02"
                  width={528}
                  height={396} />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Visually impactful data
                  </div>
                <h3 className="mt-0 mb-12">
                  Interactive Data Visualizations
                  </h3>
                <p className="m-0">
                View various visualizations sourced from government public data                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/features-split-image-03.png')}
                  alt="Features split 03"
                  width={528}
                  height={396} />
              </div>
            </div>

            <SectionHeader data={sectionHeader2} className="center-content" />

            <p className="m-0 center-content benefits">
            Improved quality of life and smoother transition
          </p>
          <p className="m-0 center-content benefits">
          Increased satisfaction in host country
          </p>
          <p className="m-0 center-content benefits">
Centralized location to look for statistical information
          </p>


          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;