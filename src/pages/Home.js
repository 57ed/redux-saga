import {
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip
} from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUserStart, loadUsersStart } from '../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  useEffect(() => {
    error && toast.error(error, [error]);
  });

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: '200px' }} role='status' color='info'>
        <span className='visually-hidden'>Carregando...</span>
      </MDBSpinner>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm('Você têm certeza que deseja deletar este usuário?')) {
      dispatch(deleteUserStart(id));
      toast.success('Usuário deletado com sucesso!');
    }
  };

  return (
    <div className='container' style={{ marginTop: '150px' }}>
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th scopr='col'>Nº</th>
            <th scopr='col'>Nome</th>
            <th scopr='col'>Email</th>
            <th scopr='col'>Telefone</th>
            <th scopr='col'>Endereço</th>
            <th scopr='col'>Ação</th>
          </tr>
        </MDBTableHead>
        {users &&
          users.map((item, index) => (
            <MDBTableBody key={index}>
              <tr>
                <th scope='row'>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <MDBBtn
                    className='mt-4 mr-3'
                    tag='a'
                    color='none'
                    onClick={() => handleDelete(item.id)}>
                    <MDBTooltip
                      title='Delete'
                      wrapperProps={{ color: 'light' }}>
                      <MDBIcon fas icon='trash' size='2x' color='danger' />
                    </MDBTooltip>
                  </MDBBtn>
                  <Link to={`/editUser/${item.id}`} className='m-3 mb-4'>
                    <MDBTooltip title='Edit' wrapperProps={{ color: 'light' }}>
                      <MDBIcon fas icon='pen' size='2x' color='info' />
                    </MDBTooltip>
                  </Link>
                  <Link to={`/userInfo/${item.id}`} className='py-4'>
                    <MDBTooltip title='View' wrapperProps={{ color: 'light' }}>
                      <MDBIcon fas icon='eye' size='2x' color='secondary' />
                    </MDBTooltip>
                  </Link>
                </td>
              </tr>
            </MDBTableBody>
          ))}
      </MDBTable>
    </div>
  );
};

export default Home;
