<template>
    <div class="container">
        <h1>Notes</h1>
        <b-alert :show="dismissCountDown"
        dismissible
        :variant="message.color"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        class="alert-popup">
            {{message.text}}
        </b-alert>
        <h3>Add new note:</h3>
        <b-form @submit.prevent="addNote(note)">
            <b-form-input id="inputNote" v-model="note.name" placeholder="Add a note" class="my-2"></b-form-input>
            <b-form-input id="inputNote" v-model="note.description" placeholder="Add a description" class="my-2"></b-form-input>
            <b-button type="submit" class="btn-success my-2 btn-block">Add</b-button>
        </b-form>
        <b-table striped hover
                 :items="notesList"
                 :fields="fields"
                 :busy.sync="isBusy"
        >
            <template v-slot:cell(Actions)="row">
                <div class="row no-gutters">
                    <div class="col-6">
                        <b-btn @click="editNote(row.item)" class="btn-warning">Edit</b-btn>
                    </div>
                    <div class="col-6">
                        <b-btn @click="deleteNote(row.item)" class="btn-danger">Delete</b-btn>
                    </div>
                </div>
            </template>
        </b-table>
        <b-modal id="modalUpdateNote" ref="modal" title="Edit your note" @hidden="resetModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit()">
                <b-form-group label="edit note name" label-for="inputEditNoteName">
                    <b-form-input id="inputEditNoteName" v-model="noteEdit.name" required></b-form-input>
                </b-form-group>
                <b-form-group label="edit note description" label-for="inputEditNoteDescription">
                    <b-form-input id="inputEditNoteDescription" v-model="noteEdit.description" required></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "Notes",
        data() {
            return {
                fields: ['_id','name','description','userId','dateAdded','Actions'],
                //notes: [],
                isBusy: false,
                message: { color: '', text: '' },
                dismissSecs: 5,
                dismissCountDown: 0,
                notes: [],
                note: {
                    name: '',
                    description: ''
                },
                noteEdit: {
                    name: '',
                    description: ''
                }
            }
        },
        computed: {
            ...mapState(['token']),
          notesList: {
              get: function() {
                return this.notes
              },
              set: function (newValue) {
                this.notes = newValue
              }
          }
        },
        created() {
            this.listNotes();
        },
        methods: {
            async listNotes() {
                let config = {
                    headers: {
                        token: this.token
                    }
                }
                this.isBusy = true;
                try {
                    let res = await this.axios.get('/notes', config);
                    let list = res.data;
                    //this.notes.data = list
                    this.notesList = list;
                    /*list.forEach(el => {
                        this.notesList.set(el)
                    })*/
                    this.isBusy = false;
                    console.log(list);
                    return list;
                }catch (e) {
                    this.isBusy = false;
                    console.error(e);
                    return []
                }
            },
            async editNote(item){
                console.log(item);
                this.message.color = 'warning';
                this.message.text = "se quiere borrar el doc con ID: "+item._id;

                //this.showAlert();
                //set value for modal variables
                this.noteEdit = item;
                console.log("button edit clicked and his params",this.noteEdit);
                //show modal through reference
                this.$refs['modal'].show()
            },
            async deleteNote(item) {
                console.log(item);
                let config = {
                    headers: {
                        token: this.token
                    }
                }
                try {
                    let res = await this.axios.delete(`/notes/${item._id}`, config)
                    this.message.color = "success";
                    this.message.text = "se borro el doc con ID: "+item._id;
                    let index = this.notes.findIndex(item => item._id === res.data._id)
                    this.notes.splice(index, 1);
                    console.log("datos actualizados despues de borrar "+this.notes);
                    this.showAlert();
                }catch (e) {
                    console.log("error in delete method",e)
                }
            },
            resetModal() {
              this.noteEdit.description = "";
              this.noteEdit.name = "";
              console.log("values in modal reset", this.noteEdit);
            },
            handleOk(modal) {
                console.log("call from ok button");
                //prevent modal from closing
                modal.preventDefault();
                //trigger form
                this.handleSubmit()
            },
            async handleSubmit() {
                let config = {
                    headers: {
                        token: this.token
                    }
                }
                try {
                    //here update the value
                    const res = await this.axios.put(`/notes/${this.noteEdit._id}`, this.noteEdit, config)
                    console.log("values from update handle submit", res.data);
                    console.log("values from noteEdit", this.noteEdit)
                    const item = res.data.data;
                    const index = this.notes.findIndex(x => x._id === item._id)
                    //this.notes[index] = item;
                    this.$set(this.notes, index, item)
                    console.log("object updated", this.notes[index])
                    this.resetModal()
                    this.$nextTick(() => {
                        this.$bvModal.hide('modalUpdateNote')
                    })
                }catch (e) {
                    console.error(e.response)
                }
            },
            countDownChanged(dismmisCountDown) {
                this.dismissCountDown = dismmisCountDown
            },
            showAlert() {
              this.dismissCountDown = this.dismissSecs
            },
            async addNote(note) {
                console.log(note);
                let config = {
                    headers: {
                        token: this.token
                    }
                }
                try {
                    const res = await this.axios.post("/notes", note, config);
                    const item = res.data;
                    console.log(item);
                    this.notes.push(item);
                    console.log("valor computado "+this.notes)
                    note.name = "";
                    note.description = "";
                } catch (e) {
                    console.error(e.response);
                }
            }
        }
    }
</script>

<style scoped>
 .alert-popup {
     position: fixed;
     top: 5%;
     left: 50%;
     transform: translateX(-50%);
 }
</style>