import styles from "./ProfileCard.module.css"

import Avatar from "../Avatar";

export default function ProfileCard( {name, role, imgSrc} ) {
    return (
        <div className={`${styles.profileCard} flex space-x-2 items-center`}>
            <Avatar imgSrc={imgSrc} size={64}/>
            <div>
                <b>{name}</b>
                <p>{role}</p>
            </div>
        </div>
    );
}