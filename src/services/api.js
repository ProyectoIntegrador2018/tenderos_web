import * as firebase from 'firebase'

// Procuction
// const env = 'prod_url'
// Pre production
//const env = 'preprod_url'
// Localhost
const env = 'http://localhost:3001'

class Request {
    static getApprovedMails() {
        const db = firebase.firestore()
        return db.collection('approved_mails').get()
    }
    static getApprovedMail(id) {
        const db = firebase.firestore()
        return db.collection('approved_mails').doc(id).get()
    }

    static postApprovedMail(approvedMail) {
        const db = firebase.firestore()
        return db.collection('approved_mails').add({
            mail: approvedMail.mail
          }).then(ref => {
            console.log('Added document with ID: ', ref.id);
          });
    }

    static putApprovedMail(approvedMail) {
        const db = firebase.firestore()
        let docRef = db.collection('approved_mails').doc(approvedMail.id)
        return docRef.set({
            mail: approvedMail.mail
        })
    }

    static deleteApprovedMail(approvedMail) {
        console.log(approvedMail + "STV")
        const db = firebase.firestore()
        return db.collection('approved_mails').doc(approvedMail.id).delete()
    }
}

export default Request