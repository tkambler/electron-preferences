'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar';
import Main from './components/main';
import _ from 'lodash';
import '../../scss/style.scss';

const allSections = api.getSections();
const preferences = api.getPreferences();
const defaults = api.getDefaults();

const sections = allSections.filter((section) => {
    return _.isBoolean(section.enabled) ? section.enabled : true;
});

sections.forEach((section) => {
    if (!preferences[section.id]) {
        preferences[section.id] = {};
    }
});

class App extends React.Component {

    state = {
        'sections': sections,
        'activeSection': sections[0].id,
        'preferences': preferences
    };

    render() {

        return (
            <React.Fragment>
                <Sidebar { ...this.state } onSelectSection={ this.onSelectSection.bind(this) } />
                <Main { ...this.state } onFieldChange={ this.onFieldChange.bind(this) } />
            </React.Fragment>
        );

    }

    onSelectSection(sectionId) {

        this.setState({
            'activeSection': sectionId
        });

    }

    onFieldChange(key, value) {

        preferences[this.state.activeSection][key] = value;

        this.setState({
            'preferences': preferences
        });

        api.setPreferences(preferences);

    }

}

ReactDOM.render(
    <App />,
    document.getElementById('window')
);
