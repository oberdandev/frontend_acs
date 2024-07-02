import styles from "./ProfileCard.module.css"

import Avatar from "../Avatar";

export default function ProfileCard(profileID) {
    return (
        <div className={`${styles.profileCard} flex space-x-2 items-center`}>
            <Avatar imgSrc="img/templates/profile2.jpg" size={48}/>
            <div>
                <b>José Freitas</b>
                <p>Recepcionista</p>
            </div>
        </div>
    );
}