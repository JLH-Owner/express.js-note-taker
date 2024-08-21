const fs=require('fs');
const util = require('util');

const noteData = '.db/db.json';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    async readNotes() {
        try {
            const notesRaw =await readFileAsync(noteData, "UTF8");
            return notesRaw ? JSON.parse(notesRaw) : [];
        } catch (err) {
            console.log(err);
        }
    }
    async addNote(data) {
        try {
            await writeFileAsync(noteData, JSON.stringify(data,null, "\t")).then(() => {
                console.log("New note added.");
            });
        } catch (err) {
            console.log(err);
        }
    }

    async deleteNote(data) {
        try {
            await writeFileAsync(noteData, JSON.stringify(data, null, "\t")).then(() => {
                console.log("Note deleted.");
            });
        } catch(err) {
            console.log(err)
;        }
    }
}

module.exports = new DB();