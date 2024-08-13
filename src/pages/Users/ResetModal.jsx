import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function randomPassword () {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let senha = '';
  for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      senha += caracteres[randomIndex];
  }
  return senha;
}

export function ResetPasswordModal ({isOpen, onClose, onSubmit, userAction}) {
  const newPassword = randomPassword();
  return (
    <Modal show={isOpen} size="md" onClose={onClose} dismissible popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-yellow-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-400 dark:text-gray-400">
            Você tem certeza que deseja resetar a senha deste usuário? <br/><b>{userAction.nome}</b>
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={()=> {
              console.log('botão reset senha submit clicado')
              console.log(newPassword)
              console.log(userAction)
              onSubmit(newPassword, userAction)}}>
              {"Sim, tenho certeza"}
            </Button>
            <Button color="gray" 
              onClick={onClose}>
              Não, cancelar.  
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    )
}