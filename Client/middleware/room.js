export default function(context) {
    if(context.$auth.user.room_id !== '') {
        context.redirect(`/room/${context.$auth.user.room_id}`);
    }
}