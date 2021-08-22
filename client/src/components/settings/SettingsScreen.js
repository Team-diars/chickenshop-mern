import React,{ useEffect, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getSettings,updateSettings} from '../../actions/settings'
import { Button, Container, Form, Row } from 'react-bootstrap'
import FormContainer from '../auth/FormContainer'

const SettingsScreen = ({updateSettings,getSettings,settings:{settings:_settings,loading}}) => {
  console.log("data > ", _settings);
  const [ formData, setFormData ] = useState({
    address:'',
    telephone: '',
    email: '',
    facebook: '',
    instagram:''
  });
  const {
    address,
    telephone,
    email,
    facebook,
    instagram
  } = formData;
  const [ displaySocialInputs, toggleSocialInputs ] = useState();
  useEffect(() => {
    getSettings();
  },[getSettings]);
  useEffect(() => {
    if(!loading && _settings){
      setFormData({
        _id: _settings._id || "",
        address: _settings.address || "",
        telephone: _settings.telephone || "",
        email: _settings.email || "",
        facebook: _settings?.social_links?.facebook || "",
        instagram: _settings?.social_links?.instagram || ""
      })
    }
  },[_settings,loading]);
  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
  const onSubmitSettings = (e) => {
    e.preventDefault();
    updateSettings({ address,email,telephone,facebook,instagram });
    // setFormData({name:'',address:'',telephone:"",facebook:""})
  }
  return (
    <FormContainer>
      <div className="d-flex justify-content-between">
        <h1>Settings</h1>
      </div>
      <Form>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            name='address'
            placeholder='Enter the address'
            onChange={ e => onChange(e) }
            value={address}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='telephone'>
          <Form.Label>Telephone</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter shop telephone'
            name='telephone'
            onChange={ (e) => onChange(e) }
            value={telephone}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter shop email'
            name='email'
            onChange={ (e) => onChange(e) }
            value={email}
          ></Form.Control>
        </Form.Group>
        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {
          displaySocialInputs && 
          <>
            <div className="form-group social-input d-flex">
              <i className="fab fa-facebook fa-2x mr-2"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={ (e) => onChange(e)}/>
            </div>

            <div className="form-group social-input d-flex">
              <i className="fab fa-instagram fa-2x mr-2"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={ (e) => onChange(e)}/>
            </div>
          </>
        }
        <Button type='submit' variant='primary' onClick={onSubmitSettings}>
          Save Changes
        </Button>
      </Form>
    </FormContainer>
  )
}

const mapStateToProps = (state) => ({
  settings: state.settings,
})

SettingsScreen.propTypes = {
  getSettings: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{getSettings,updateSettings})(SettingsScreen);