import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBValidation
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserStart, updateUserStart } from '../redux/actions';

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: ''
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { users } = useSelector((state) => state.data);
  const { name, email, phone, address } = formValue;
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log('users', users);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUSer = users.find((item) => item.id === Number(id));
      setFormValue({ ...singleUSer });
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success('Usuário criado com sucesso!', {
          position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => history.push('/'), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        dispatch(createUserStart(formValue));
        toast.success('Usuário atualizado com sucesso!', {
          position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() => history.push('/'), 500);
        setEditMode(false);
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <MDBContainer breakpoint='sm'>
        <MDBRow>
          <MDBCol className='col-12 my-3'>
            <h1 className='text-primary'>
              {!editMode ? 'Criar Usuário' : 'Atualizar Usuário'}
            </h1>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <MDBValidation noValidate onSubmit={handleSubmit} className='mt-3'>
              <div
                style={{
                  margin: 'auto',
                  padding: '5px',
                  maxWidth: '400px',
                  alignContent: 'center'
                }}
                className='shadow-2-strong p-4 square rounded'>
                <MDBInput
                  value={name || ''}
                  name='name'
                  type='text'
                  onChange={onInputChange}
                  required
                  label='Nome'
                  validation='Por favor insira um nome válido.'
                  invalid
                  style={{ marginTop: '25px' }}
                />

                <MDBInput
                  value={email || ''}
                  name='email'
                  type='email'
                  onChange={onInputChange}
                  required
                  label='Email'
                  validation='Por favor insira um email válido.'
                  invalid
                  style={{ marginTop: '50px' }}
                />

                <MDBInput
                  value={phone || ''}
                  name='phone'
                  type='number'
                  onChange={onInputChange}
                  required
                  label='Telefone'
                  validation='Por favor insira um número de telefone válido.'
                  invalid
                  style={{ marginTop: '50px' }}
                />
                <MDBInput
                  value={address || ''}
                  name='address'
                  type='text'
                  onChange={onInputChange}
                  required
                  label='Endereço'
                  validation='Por favor insira um Endereço válido.'
                  invalid
                  style={{ marginTop: '50px' }}
                />
              </div>

              <MDBCol>
                <div className='mb-3'>
                  <MDBBtn
                    style={{
                      marginRight: '10px',
                      marginTop: '30px',
                      marginBottom: '50px'
                    }}
                    type='submit'
                    color='info'>
                    {!editMode ? 'Criar Usuário' : 'Atualizar Usuário'}
                  </MDBBtn>

                  <MDBBtn
                    onClick={() => history.push('/')}
                    color='danger'
                    style={{
                      marginRight: '10px',
                      marginTop: '30px',
                      marginBottom: '50px'
                    }}>
                    Voltar
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBValidation>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default AddEditUser;
