import "./ProfilePage.css";
import { FC, FormEvent, useState } from "react";
import { Container, Card , Form, Button} from "react-bootstrap";
import { useAppDispatch } from "../../store";
import { changeUser } from "../../store/user/slice";

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onUserChange = (event:FormEvent) =>{
    let newLogin = (login == "")?undefined:login
    let newPassword = (password == "")?undefined:password
    let newEmail = (email == "")?undefined:email
    event.preventDefault();
    dispatch(changeUser({username:newLogin,password:newPassword,email:newEmail}))
  }

  return (
    <Container id="profile-page">
      <Card className="profile-page">
        <Card.Title className="largeText">Изменение профиля</Card.Title>
        <Card.Body className="card-body">
        <Form onSubmit={onUserChange} className="profile-form">
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Новый логин"
                    value={login}
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