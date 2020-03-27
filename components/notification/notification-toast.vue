<template>
    <div class="text-center">

        <b-toast id="my-toast" variant="secondary" solid no-auto-hide="true">
            <template v-slot:toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">

                    <strong class="mr-auto">Notice!</strong>
                    <small class="text-muted mr-2">42 seconds ago</small>
                </div>
            </template>
            <v-layout>
                <v-flex lg2>
            <b-img style="object-fit: cover;border-radius: 50%;" src="https://picsum.photos/1024/400/?image=39" alt="Responsive image" class="mr-2" width="50" height="50"></b-img>
                </v-flex>
                <v-flex lg10>
            <p style="margin-bottom: 0">new notification from</p>
            <h6 style="margin-bottom: 0">Mohmmed</h6>
                </v-flex>
            </v-layout>
        </b-toast>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    // const sound =  new Audio('/images/notif_sound.mp3');

    export default {
        name: "notification-toast",
        data:()=>{
            return{
                items: [
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me 2' },
                ],
            }
        },
        created() {






            // let store = this.$store;
            // this.$store.commit('setNotification', null);
            // let id = localStorage.getItem('id');
            // var own_notifications = this.$pusher.subscribe('own_notifications_'+id);
            // own_notifications.bind('own_notifications_'+id, function(data) {
            //     console.log('Private notification', data);
            //     store.commit('setNotification', data);
            // });
            // console.log(own_notifications, "PUSHHER");

        },
        computed:{
            // getNotification(){
            //     return this.$store.getters.getNotification;
            // }
        },
        watch:{
            // getNotification(notfi){
            //     if (notfi !== null){
            //         this.popToast(notfi);
            //     }
            // }
        },
        methods: {
            popToast(notfi) {
                sound.play();
                this.$bvToast.show('my-toast')
                // // Use a shorter name for this.$createElement
                // const h = this.$createElement
                // // Increment the toast count
                // // Create the message
                // const vNodesMsg = h(
                //     'p',
                //     { class: ['text-left', 'mb-0'] },
                //     [
                //         h('strong', {}, notfi.notification.description),
                //     ]
                // )
                // // Create the title
                // const vNodesTitle = h(
                //     'div',
                //     { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
                //     [
                //         h('strong', { class: 'mr-2' }, notfi.notification.description),
                //         h('small', { class: 'ml-auto text-italics' }, '5 minutes ago')
                //     ]
                // )
                // // Pass the VNodes as an array for message and title
                // this.$bvToast.toast([vNodesMsg], {
                //     title: [vNodesTitle],
                //     solid: true,
                //     variant: 'secondary'
                // })
            }
        }
    }
</script>

<style scoped>
    >>>.b-toast {
        display: block;
        position: relative;
        max-width: 350px;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        background-clip: padding-box;
        z-index: 1;
        border-radius: 0.25rem;
        margin-top: 55px !important;
    }
</style>
