import { events } from "bdsx/event";

events.serverOpen.on(() => {
    import ("./guild");
    console.log("guild plugin loaded".green);
})
