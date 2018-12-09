import React, { Component } from 'react'
import StudentListTemplate from './components/StudentListTemplate'
import NameSearchForm from './components/NameSearchForm'
import TagsSearchForm from './components/TagsSearchForm'

import * as Axios from './util/AxiosCalls'

class App extends Component {

    state = {
        students : [],              // student list

        inputSearchName : null,     // input field - name search 
        inputSearchTags : null,     // input field - tags search 
        inputAddTag : ''            // input field - add a tag
    }
    
    // value of the input field( name search) changed
    handleChangeName = (e) => {
        this.setState({
            inputSearchName: e.target.value 
        })
    }

    // value of the input field( tags search) changed
    handleChangeTags = (e) => {
        this.setState({
            inputSearchTags: e.target.value 
        })
    }

    // value of the input field( add a tag) changed
    handleChangeAddTag = (id, e) => {

        this.setState({
            inputAddTag: e.target.value
        })
    }

    // add a tag
    handleAddTag = (id, e) => {

        if(e.key === 'Enter') {     // only if Enter key pressed
            
            const { students } = this.state
        
            // finds index
            const index = students.findIndex( student => student.id === id )

            // copys students -> newStudent
            let newStudents = students.slice(0)

            // insert new tag
            newStudents[ index ].tags.push(e.target.value)

            // store new state
            this.setState({
                students: newStudents,
                inputAddTag : ''
            })
        }
    }

    // toggle +/-
    handlePlus_minusCLick = (id) => {

        const { students } = this.state
        
        // finds index
        const index = students.findIndex( student => student.id === id )

        const selectedStudent = students[ index ];

        // copys array
        const newStudents = [...students];
    
        // set new state
        newStudents[index] = { 
            ...selectedStudent, 
            plus: !selectedStudent.plus     // toggle  plus <--> minus
        }
    
        // store new state
        this.setState({
            students: newStudents
        })
    }



    componentDidMount = () => {

        // fetches student list by calling axios
        Axios.fetchStuentList().then( res => {
            
            let newStudentList = []

            // inserts 'tags' array, 'plus':true to each element
            res.data.students.forEach( e => {               
                e.avg = ( e.grades.reduce( (a, x) => a += Number(x), 0) / e.grades.length ).toFixed(3)    
                e.tags = []
                e.plus = true
                newStudentList.push( e )
            })

            this.setState({
                students : newStudentList
            })
        })
    }


    render() {

        return (
            <div>
                <StudentListTemplate 
                    NameSearchForm={<NameSearchForm valueName={this.state.inputSearchName} onChangeName={this.handleChangeName}/>} 
                    TagsSearchForm={<TagsSearchForm onChangeTags={this.handleChangeTags}/>} 
                    students={this.state.students} 
                    inputSearchName={this.state.inputSearchName}
                    inputSearchTags={this.state.inputSearchTags}
                    onPlus_minusCLick={this.handlePlus_minusCLick}
                    inputAddTag={this.state.inputAddTag}

                    onKeyChange={this.handleChangeAddTag}
                    onKeyPressTag={this.handleAddTag}/>

            </div>
        )
    }
}

export default App