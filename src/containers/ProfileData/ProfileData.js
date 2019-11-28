import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core/';

import axios from '../../axios-global';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import styles from './ProfileData.module.css';
import userImage from '../../assets/images/user.png';
import Aux from '../../hoc/Aux';
import profileActionCreators from '../../store/actions/profile';
import SnackBarContentWrapper from '../../components/UI/SnackBarContentWrapper/SnackBarContentWrapper';
import ProfileView from '../../components/Profile/Profile';

class ProfileData extends Component {
    state = {
        profileForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name/Alias'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'New Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            county: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'County'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            } 
        },
        formIsValid: false,
        loading: false,
    }

    componentDidMount(){
        this.props.fetchProfile(this.props.token, this.props.userId);
    }

    editProfileHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.profileForm){
            formData[formElementIdentifier] = this.state.profileForm[formElementIdentifier].value;
        }
        formData.userId = this.props.userId
        this.props.editProfile(formData,this.props.token, this.props.userId);
        this.props.cancelEditProfileMode();
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength){
            isValid = value.length <= rules.minLength && isValid;
        }
        return isValid;
    }

    closeMesssage = () => {
        this.props.closeMessage();
    }

    inputChangedHanlder = (event, inputIdentifier) => {
        //console.log(event.target.value);
        const updatedOrderForm = { ...this.state.profileForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        if(inputIdentifier !== 'deliveryMethod'){
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedFormElement.touched = true; 
        }
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        //console.log(updatedFormElement);
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        //console.log(formIsValid);
        this.setState({profileForm: updatedOrderForm, formIsValid});
    }

    switchToEditProfile = () => {
        let updatedForm;
        if(this.props.profile){
            updatedForm = {
                ...this.state.profileForm
            }
            for (let formElementIdentifier in updatedForm){
                updatedForm[formElementIdentifier].value = this.props.profile[formElementIdentifier];
            }
            //console.log(updatedForm);
            this.setState({
                profileForm: updatedForm
            });
        }
        this.props.switchToEditProfileMode();
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.profileForm){
            formElementsArray.push({
                id: key,
                config: this.state.profileForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            name={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHanlder(event, formElement.id)}
                        />

                    ))}
                    <Button btnType="Save" clicked={this.editProfileHandler} disabled={!this.state.formIsValid}>SAVE</Button>
                    <Button btnType="Edit" clicked={() => { this.props.cancelEditProfileMode() }} >CANCEL</Button>
            </form>
        )
        if(this.props.postProcessLoading){
            form = <Spinner/>
        }
        let profileView;
        if(this.props.fetchProcessLoading){
            profileView = <Spinner/>
        } else if(this.props.profile){
            profileView = <ProfileView swithToEditMode={this.switchToEditProfile} profileData={this.props.profile}/>
        } else {
            profileView = <ProfileView swithToEditMode={this.switchToEditProfile} />
        }
        
        return(
            <Aux>
                {
                    this.props.profile.name ? 
                        <h1 style={{textAlign: "left", paddingLeft: "20px"}}>Welcome, {this.props.profile.name}</h1> :
                        null
                }
                <hr color="#ccc"></hr>
                <div className={styles.ProfileContainer}>
                    {this.props.posted && 
                        <Snackbar 
                            autoHideDuration={2000}
                            open={this.props.posted}
                            onClose={this.closeMesssage}
                        >
                            <SnackBarContentWrapper
                                onClose={this.closeMesssage}
                                variant="success"
                                message={"Details saved successfully!"}
                            />
                        </Snackbar>
                    }
                    {
                        this.props.error !== null && 
                        <Snackbar 
                            autoHideDuration={2000}
                            open={this.props.error !== null}
                            onClose={this.closeMesssage}
                    >
                        <SnackBarContentWrapper
                            onClose={this.closeMesssage}
                            variant="error"
                            message={"Oops :( Something went wrong. Please try again later."}
                        />
                    </Snackbar>
                    }
                    {!this.props.profile && 
                        <Snackbar 
                            //autoHideDuration={2000}
                            open={this.props.posted}
                            onClose={this.closeMesssage}
                        >
                            <SnackBarContentWrapper
                                onClose={this.closeMesssage}
                                variant="info"
                                message={"Kindly Complete Your Profile to continue."}
                            />
                        </Snackbar>
                    }
                    <img alt="Profile" src={userImage} className={styles.Image} />
                    {   !this.props.editProfileMode ? profileView :
                        <div className={styles.ProfileData}>
                            <h4>Your Profile Information</h4>
                            {form}
                        </div>
                    }
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetchProcessLoading: state.profile.fetchProcessLoading,
        postProcessLoading: state.profile.postProcessLoading,
        profile: state.profile.profile,
        token: state.auth.token,
        userId: state.auth.userId,
        posted: state.profile.posted,
        error: state.profile.error,
        editProfileMode: state.profile.editProfileMode
    }

}

const mapDispatchToProps = dispatch => {
    return {
        editProfile: (profile, token, userId) =>  dispatch(profileActionCreators.editProfile(profile, token, userId)),
        closeMessage: () => dispatch(profileActionCreators.closeMessage()),
        fetchProfile: (token, userId) => dispatch(profileActionCreators.fetchProfile(token, userId)),
        switchToEditProfileMode: () => dispatch(profileActionCreators.switchToEditProfileMode()),
        cancelEditProfileMode: () => dispatch(profileActionCreators.cancelEditProfileMode())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ProfileData, axios));