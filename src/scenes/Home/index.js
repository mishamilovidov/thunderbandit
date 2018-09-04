import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { soundCloudSexOnTheTarmac } from '../../services/soundcloud';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { transitionOptions, slideUpTransitionOptions } from '../../services/transitions';
import './styles.css';

class Home extends Component {
  render() {
    const meta = {
      title: 'THUNDER BANDIT',
      description: 'SEX ON THE TARMAC OUT NOW via (you guessed it) SoundCloud. Listen to the new EP released September 1, 2018. All media created and produced by Thunder Bandit.',
      canonical: 'https://thunderbandit.com/',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'thunderbandit,@thunderbandit,thunder,bandit,tarmac,sex,ep,released'
        }
      }
    };

    return (
      <DocumentMeta {...meta}>
        <div className="Home">
          <div className="layer"></div>
          <ReactCSSTransitionGroup {...transitionOptions}>
            <div className="image"></div>
          </ReactCSSTransitionGroup>
          <div className="text">
            <ReactCSSTransitionGroup {...transitionOptions}>
              <div className="subtitle">EP Out Now</div>
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup {...slideUpTransitionOptions}>
              <div className="title">Sex on the Tarmac</div>
              <div className="callToAction">
                <a href={soundCloudSexOnTheTarmac}>
                  Listen on SoundCloud
                </a>
              </div>
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </DocumentMeta>
    );
  }
}

export default Home;
