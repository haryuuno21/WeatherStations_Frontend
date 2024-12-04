import axios, { AxiosResponse } from "axios";
import "./ProfilePage.css";
import { FC, FormEvent, useState } from "react";
import { Container, Card , Form, Button} from "react-bootstrap";
import { userActions, useUserName } from "../../store/user";
import { useAppDispatch } from "../../store";

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const [newLogin, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const changeUser = (event:FormEvent) =>{
    event.preventDefault();
    if(newLogin!=""){
      axios.put('http://localhost:3000/api/users/change/',{
        username: newLogin
      }).then(()=>dispatch(userActions.setUserName(newLogin)))
      .catch((response:AxiosResponse) => alert(response))
    }
    if(password!=""){
      axios.put('http://localhost:3000/api/users/change/',{
        password: password
      }).catch((response:AxiosResponse) => alert(response))
    }
    if(email!=""){
      axios.put('http://localhost:3000/api/users/change/',{
        email: email
      }).catch((response:AxiosResponse) => alert(response))
    }
  }

  return (
    <Container id="profile-page">
      <Card className="profile-page">
        <Card.Title className="largeText">Изменение профиля</Card.Title>
        <Card.Body className="card-body">
        <Form onSubmit={changeUser} className="profile-form">
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Новый логин"
                    value={newLogin}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Новый пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Новый email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" variant="secondary" className="save-changes">
                Сохранить
            </Button>
        </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};