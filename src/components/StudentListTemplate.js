import React, {Component} from 'react'
import './StudentListTemplate.css'
import StudentCard from './StudentCard'

class StudentListTemplate extends Component {

     // if + button is clicked, all the grades are showing
    showGrades = grades => {
        let cnt = 0
        return grades.map(
            grade => (
                <ul>Test {++cnt}: &nbsp;&nbsp;&nbsp;&nbsp; {grade}%</ul>
            )
        )
    }

    // if + button is clicked, tags and input field for new tag are showing
    showTagsAndInput = (id, tags) => {

        let tagList = []
        if( tags )
        tagList = tags.map(
            tag => (
                <span className='tag'>{tag} </span>
            )
        )

        return (
            <ul>
                { tagList.length > 0 && tagList }
                <br />
                <input className='inputTag' value={this.props.inputAddTag} placeholder='Add a tag' 
                            onChange={(e)=>this.props.onKeyChange(id, e)} 
                            onKeyPress={(e)=>this.props.onKeyPressTag(id, e)}
                        />
            </ul>
        )
    }

    render() {

        const { NameSearchForm, TagsSearchForm, students, onPlus_minusCLick, inputSearchName, inputSearchTags } = this.props
        let filteredListByName = []
        let filteredListByTag = []

        // filtering by name
        students.forEach( e => {

            if( !inputSearchName ||     // input filed is empty
                e.firstName.toUpperCase().indexOf(inputSearchName.toUpperCase()) >= 0 || 
                e.lastName.toUpperCase().indexOf(inputSearchName.toUpperCase()) >= 0 )
                
                filteredListByName.push(e)
        })

        // filtering by tag
        filteredListByName.forEach( e => {

            if( !inputSearchTags )        // input field is empty
                filteredListByTag.push(e)

            else {
              
                for( let i = 0 ; i < e.tags.length ; i++ ) {
                    if( e.tags[i].indexOf(inputSearchTags) >= 0 ) {
                        filteredListByTag.push(e)
                        break
                    }
                }
            }
        })


        // generates each card of individual student
        const cards = filteredListByTag.map(
            (student) =>  (
                <div className='container'>
                    <div className='item'><figure> <img src={`${student.pic}`} /> </figure> </div> 
                    <div className='item'>
                        <p className='name' > {student.firstName.toUpperCase()}  {student.lastName.toUpperCase()} </p>
                        <ul>Email: {student.email}</ul>
                        <ul>Company: {student.company}</ul>
                        <ul>Skill: {student.skill}</ul>
                        <ul>Average: {student.avg}%</ul>
                        { !student.plus && <br/> }
                        {
                            !student.plus &&
                            this.showGrades(student.grades)
                        }
                        { !student.plus && <br/> }
                        { !student.plus && 
                            this.showTagsAndInput(student.id, student.tags)
                        }
                    </div>
                    <div className='item'>
                        <p onClick={()=>{onPlus_minusCLick(student.id)}} className='plus_minus'>
                            { student.plus ? '+' : '-' }
                        </p>
                    </div>   
                </div>
            )          
        )



        return (
            <main className="student-list-template">
                <section className="form-wrapper">
                    {NameSearchForm}
                </section>
                <section className="form-wrapper">
                    {TagsSearchForm}
                </section>
                <section className="list-wrapper">
                    {
                        students.length > 0 &&
                        <StudentCard cards={cards} />
                    }
                    
                </section>
            </main>
        )
    }
}

export default StudentListTemplate;