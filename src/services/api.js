import axios from 'axios'
import lockr from 'lockr'
const admin = require('firebase-admin')
// Procuction
// const env = 'prod_url'
// Pre production
//const env = 'preprod_url'
// Localhost
const env = 'http://localhost:3001'

class Request {

    static getAccessToken(){
        if(lockr.get('token')) {
            return 'Bearer ' + lockr.get('token').access_token
        }
        return 'Not logged in'
    }

    static getGeneralIssues() {
        const db = admin.firestore()
        console.log(db.collection('general_issues').get())
        return db.collection('general_issues').get()
        .then((snapshot) => {
            console.log("STVio")
            console.log(snapshot);
          snapshot.forEach((doc) => {
              console.log("STV")
            console.log(doc);
          });
        })
        .catch((err) => {
            console.log(err)
          console.log('Error getting documents', err);
        });
        return Promise.resolve({data: [{
            id: "1",
            title: "titulo",
            status: "status",
            visibility: "vis",
            opened_by: "",
            start_date: ""}]})

        return axios.get(`${env}/general_issues?access_token=${this.getAccessToken()}`)
    }
    static getGeneralIssue(id) {
        return axios.get(`${env}/general_issues/${id}?access_token=${this.getAccessToken()}`)
    }

    static postGeneralIssue(generalIssues) {
        return axios.post(`${env}/general_issues?access_token=${this.getAccessToken()}`, generalIssues)
    }

    static putGeneralIssue(generalIssue) {
        return axios.put(`${env}/general_issues/${generalIssue.id}?access_token=${this.getAccessToken()}`, generalIssue)
    }

    static deleteGeneralIssue(generalIssue) {
        return axios.delete(`${env}/general_issues/${generalIssue.id}?access_token=${this.getAccessToken()}`)
    }
}

export default Request