import React, {Component} from 'react';
import './StudentCard.css';

class StudentCard extends Component {


    render() {

        const {cards} = this.props

        return (
            <div className="student-card">
                {cards}
            </div>
        )
    }
}

export default StudentCard;