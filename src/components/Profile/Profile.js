import React from 'react';
import './Profile.css';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        const { user } = props;
        this.state = {
            name: user.name,
            age: user.age,
            pet: user.pet
        };
    }

    onFormChange = (event) => {
        switch(event.target.name) {
            case 'username':
                this.setState({ name: event.target.value})
                break;
            case 'age':
                this.setState({ age: event.target.value });
                break;
            case 'pet':
                this.setState({ pet: event.target.value});
                break;
            default:
                return
        }
    }

    onFormSubmit = (data) => {
        fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formInput: data
            })
        }).then(res => {
            this.props.toggleModal();
            this.props.loadUser({ ...this.props.user, ...data});
        }).catch(console.log)
    }

    render() {

        const { isProfileOpened, toggleModal, user } = this.props;
        const { name, age, pet } = this.state;

        return (
            <div className="profile-modal">
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
            <main className="pa4 black-80 w-80">
            <img src="http://tachyons.io/img/logo.jpg" 
                alt="avatar" 
                className="h3 w3 dib"/>
                <h1>{ this.state.name }</h1>
                <h4>Image submitted: { user.entries }</h4>
                <p>Member since: { new Date(user.joined).toLocaleDateString() }</p>
                <hr/>
                <label htmlFor="username" className="mt2 fw6">Name</label>
                <input
                className="pa2  ba w-100"
                type="text"
                name="username"
                id="name"
                placeholder={user.name} 
                onChange={this.onFormChange}/>
    
                <label htmlFor="age" className="mt2 fw6">Age</label>
                <input
                className="pa2  ba w-100"
                type="text"
                name="age"
                id="age"
                placeholder={user.age}
                onChange={this.onFormChange} />
    
                <label htmlFor="pet" className="mt2 fw6">Pet</label>
                <input
                className="pa2  ba w-100"
                type="text"
                name="pet"
                id="pet"
                placeholder={user.pet}
                onChange={this.onFormChange} />
          
                <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                    <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20" onClick={() => {this.onFormSubmit({ name, age, pet})}}>
                        Save
                    </button>
                    <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20" onClick={toggleModal}>
                        Cancel
                    </button>
                </div>
    
            </main>
            <div className="modal-close" onClick={toggleModal}>&times;</div>
          </article>
            </div>
        );
    }
}

export default Profile;