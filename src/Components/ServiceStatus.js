import React from 'react';
import configdata from '../config.json'
import styles from './ServiceStatus.module.css';

class ServiceStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [
        'http://localhost:5000/riverlevel/14869?dateFrom=2023-10-05',
        'http://localhost:5000/rainfall/14881?dateFrom=2023-10-05',
        'http://localhost:5000/temperature/wmr-89/outside?dateFrom=2023-10-05',
        'http://localhost:5000/summary/',
        'http://localhost:5000/somethigndsf/'
      ],
      results: {},
    };
  }

  componentDidMount() {
    this.state.urls.forEach(url => {
      fetch(url,
            {
                headers: new Headers({
                    'authorisation': configdata.API_KEY
                })
            })
        .then(response => {
          this.setState(prevState => ({
            results: { ...prevState.results, [url]: response.status }
          }));
        })
        .catch(() => {
          this.setState(prevState => ({
            results: { ...prevState.results, [url]: 'Failed' }
          }));
        });
    });
  }

  render() {
    return (
      <div className={styles.serviceContainer}> {/* Use the new serviceContainer class here */}
        <ul className={styles.serviceList}>
          {this.state.urls.map(url => {
            const resultClass = this.state.results[url] === 'Failed' || this.state.results[url] >= 400
              ? `${styles.serviceItem} ${styles.failure}`
              : `${styles.serviceItem} ${styles.success}`;

            return (
              <li key={url} className={resultClass}>
                {url} - {this.state.results[url] || <span className={styles.loading}>Loading...</span>}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

export default ServiceStatus;
