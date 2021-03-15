import React,{ useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import FormContainer from '../auth/FormContainer'

const SettingsScreen = () => {
  const [ formData, setFormData ] = useState({
    address:'',
    telephone: '',
    facebook: '',
    instagram:''
  });
  const {
    address,
    telephone,
    facebook,
    instagram
  } = formData;
  const [ displaySocialInputs, toggleSocialInputs ] = useState();
  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
  return (
    <FormContainer>
      <Row className="d-flex justify-content-between">
        <h1>Settings</h1>
      </Row>
      <Form>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the address'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='telephone'>
          <Form.Label>Telephone</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter shop telephone'
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
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={ (e) => onChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="instagram" value={instagram} onChange={ (e) => onChange(e)}/>
            </div>
          </>
        }
        <Button type='submit' variant='primary'>
          Save Changes
        </Button>
      </Form>
    </FormContainer>
  )
}

export default SettingsScreen