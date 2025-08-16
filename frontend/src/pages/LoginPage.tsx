import LoginForm from "../components/LoginForm";
import Modal from "../components/Modal";

const LoginqPage = () => {
    return <div className="flex flex-col items-center justify-center p-10 gap-2 rounded-lg shadow-lg w-full">
        <Modal isOpen >
            <LoginForm onSubmit={()=>{}}/>
        </Modal>
    </div>;
}

export default LoginqPage;