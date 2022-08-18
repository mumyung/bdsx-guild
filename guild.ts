/*
 * 웬만하면 2차 수정은 삼가 해주세요
 * made by mono5230   
 * 버그 문의 :
   https://open.kakao.com/o/shIG85cd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    */                                                                                                                                                                                                                                                                                                                                                                                                                                                           command.register("monoguild", "지우지 마세요").overload((params, origin, output) => {bedrockServer.executeCommand(`tellraw "${origin.getName()}" {"rawtext":[{"text":"이서버는 mono5230의 길드를 쓰고있습니다"}]}`)}, {})/*
*/

// 길드 파일 이름 (guild.json 바꾸면 됨)
const guildFile = "guild.json";

// 칭호 파일 이름 (title.json 바꾸면 됨)
const titleFile = "title.json";

// 길드당 킬 횟수 저장파일 이름 (kills.json 바꾸면 됨)
const killFile = "kills.json"

// 길드 데이터 저장 디렉토리(폴더) 이름 (guild 바꾸면 됨)
const guildDirectory = "guild"

// 길드 승인요청 파일 이름 (request 바꾸면 됨)
const requestFile = "request.json"

// 길드 번호 파일 이름 (guildNumber 바꾸면 됨)
const guildNumber = "guildNumber.json"
const guildNumber1 = "guildNumber1.json"

// 길드 이름, 설명 글자 수, 최대 인원, 칭호 길이 설정 
const guildMax: number = 8
const explanationMax: number = 15
const max: number = 10
const titleMaxLength: number = 12

// 길드, 칭호 없을때
const guildBase = "길드없음"
const titleBase = "칭호없음"



// 채팅 바꾸는법

// 채팅 변수들
// ${guild} = 길드이름
// ${guildNum} = 길드번호
// ${guildAuthority} = 길드 권한
// ${title} = 칭호
// ${name} = 유저이름
// ${messahe} = 메세지

// 기본 채팅 형식 
// < 길드이름 길드번호 > < 칭호 > 닉 => 메세지
// 변수로 바꾸면
// < ${guild} ${guildNum} > < ${title} > ${name} => ${message}
// (쉽게 변경 ㄱㄴ)



//칭호 권한 (a, b)
// a = 관리자가 설정
// b = 플레이어가 설정
const titlestyle: string = "b";

import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { ActorWildcardCommandSelector, CommandPermissionLevel, CommandRawText } from "bdsx/bds/command";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { CANCEL } from "bdsx/common";
import { command } from "bdsx/command"
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Form } from "bdsx/bds/form"
import * as fs from "fs";
import { CxxString } from "bdsx/nativetype";
import { ServerPlayer } from "bdsx/bds/player";

if (fs.existsSync(guildFile) == false) {
    fs.writeFileSync(guildFile, JSON.stringify({}));
    console.log(`Made '${guildFile}'`.gray, " - mono5230".green);
};

if (fs.existsSync(titleFile) == false) {
    fs.writeFileSync(titleFile, JSON.stringify({}));
    console.log(`Made '${titleFile}'`.gray, " - mono5230".green);
};

if (fs.existsSync(killFile) == false) {
    fs.writeFileSync(killFile, JSON.stringify({}));
    console.log(`Made '${killFile}'`.gray, " - mono5230".green);
};

if (fs.existsSync(requestFile) == false) {
    fs.writeFileSync(requestFile, JSON.stringify({}));
    console.log(`Made '${requestFile}'`.gray, " - mono5230".green);
};

if (fs.existsSync(guildDirectory) == false) {
    fs.mkdirSync(guildDirectory);
    console.log(`Made '${guildDirectory}'`.gray, " - mono5230".green);
};

if (fs.existsSync(guildNumber) == false) {
    fs.writeFileSync(guildNumber, JSON.stringify({}));
    console.log(`Made '${guildNumber}'`.gray, " - mono5230".green);
};

if (fs.existsSync(guildNumber1) == false) {
    fs.writeFileSync(guildNumber1, JSON.stringify({}));
    let number = {};
    number = { number: 0 }
    fs.writeFileSync(guildNumber1, JSON.stringify(number));
    console.log(`Made '${guildNumber1}'`.gray, " - mono5230".green);
};

const guildFileRead = JSON.parse(fs.readFileSync(guildFile, "utf8"));
const titleFileRead = JSON.parse(fs.readFileSync(titleFile, "utf8"));
const killFileRead = JSON.parse(fs.readFileSync(killFile, "utf8"));
const requestFileRead = JSON.parse(fs.readFileSync(requestFile, "utf8"));
const guildNumberRead = JSON.parse(fs.readFileSync(guildNumber, "utf8"));
const guildNumber1Read = JSON.parse(fs.readFileSync(guildNumber1, "utf8"));

function saveGuild() {
    fs.writeFileSync(guildFile, JSON.stringify(guildFileRead), "utf8");
}

function saveKill() {
    fs.writeFileSync(killFile, JSON.stringify(killFileRead), "utf8");
}

function saveRequest() {
    fs.writeFileSync(requestFile, JSON.stringify(requestFileRead), "utf8");
}

function saveTitle() {
    fs.writeFileSync(titleFile, JSON.stringify(titleFileRead), "utf8");
}

function saveGuildNumber() {
    fs.writeFileSync(guildNumber, JSON.stringify(guildNumberRead), "utf8");
}

function saveGuildNumber1() {
    fs.writeFileSync(guildNumber1, JSON.stringify(guildNumber1Read), "utf8");
}

events.playerAttack.on((ev) => {
    const victimName = ev.victim.getName();
    const playerName = ev.player.getName();

    if (guildFileRead[playerName] == undefined || guildFileRead[victimName] == undefined) {
    } else {
        if (guildFileRead[victimName] == guildFileRead[playerName]) {
            const guildDB = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
            const read = JSON.parse(fs.readFileSync(guildDB, "utf8"))
            if (read.pvp == 1) {
            } else {
                bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c같은 길드끼리 때릴수 없습니다!"}]}`);
                return CANCEL;
            }
        }
    }
});

events.entityDie.on((ev) => {
    const killerPlayerName: any = ev.damageSource.getDamagingEntity()?.getName();
    if (ev.entity.isPlayer() && ev.damageSource.getDamagingEntity()?.isPlayer()) {
        if (guildFileRead[killerPlayerName] != undefined) {
            killFileRead[guildFileRead[killerPlayerName]] = killFileRead[guildFileRead[killerPlayerName]] + 1;
            saveKill();
        }
    }
})

const lastChatTimes: Record<string, number> = {};
const LastChat: Record<string, string> = {};

events.packetBefore(MinecraftPacketIds.Text).on((pkt, ni, id) => {
    const actor = ni.getActor()!;
    const username = actor.getName();
    const msg = pkt.message.replace(" ", "");

    if (msg.length > 30) {
        bedrockServer.executeCommand(`tellraw "${username}" {"rawtext":[{"text":"§c채팅이 너무 깁니다!"}]}`);
        return CANCEL;
    }

    if (lastChatTimes[username] === undefined) {
        lastChatTimes[username] = Date.now();
    } else if (Date.now() - lastChatTimes[username] < 1000) {
        bedrockServer.executeCommand(`tellraw "${username}" {"rawtext":[{"text":"§c채팅이 너무 빠릅니다!"}]}`);
        return CANCEL;
    } else {
        lastChatTimes[username] = Date.now();
    }

    if (!LastChat[username]) {
        LastChat[username] = msg;
    } else if (LastChat[username]) {
        const oldMsg = LastChat[username];

        if (msg === oldMsg) {
            LastChat[username] = msg;
            actor.sendMessage("§c똑같거나 비슷한 채팅입니다!");
            return CANCEL;
        }
        if (Math.abs(oldMsg.length - msg.length) < 3) {
            if (oldMsg.includes(msg) || msg.includes(oldMsg)) {
                LastChat[username] = msg;
                actor.sendMessage("§c똑같거나 비슷한 채팅입니다!");
                return CANCEL;
            }
        }
    }
    LastChat[username] = msg;
});

events.packetBefore(MinecraftPacketIds.Text).on((ptr, ni, id) => {
    const name: any = ni.getActor()?.getName()
    const message = ptr.message.replace(/"/gi, `''`).replace(/\n/gi, "");
    const guild = guildFileRead[name] || guildBase
    const guildNum = guildNumberRead[guild]
    const title = titleFileRead[name] || titleBase
    if (guildFileRead[name] === undefined) {
        // 길드 없을떄 채팅
        if (message.includes(`\\`) == true) {
            bedrockServer.executeCommand(`tellraw "${name}" {"rawtext":[{"text":"§c\\이 기호는 이 섭에서 쓸수 없습니다!"}]}`)
            return CANCEL;
        } else {
            bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§l< §r${guild}§l§f > §l< §r${title}§f§l >§r ${name} => ${message}"}]}`);
            return CANCEL
        }
    } else {
        const guildDB = `./${guildDirectory}/${guildFileRead[name]}/DB.json`
        const guildAuthority = JSON.parse(fs.readFileSync(guildDB, "utf8"))[name] || guildBase
        if (message.includes(`\\`) == true) {
            bedrockServer.executeCommand(`tellraw "${name}" {"rawtext":[{"text":"§c\\이 기호는 이 섭에서 쓸수 없습니다!"}]}`)
            return CANCEL;
        } else if (guildAuthority === "길드장") {
            bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§l< §f${guild}§l§f ${guildNum} > = < §c§l길드장§f > §l< §f${title}§l§f >§r ${name} => ${message}"}]}`);
            return CANCEL;
        } else if (guildAuthority === "부길드장") {
            bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§l< §f${guild}§l§f ${guildNum} > = < §e§l부길드장§f > §l< §f${title}§l§f >§r ${name} => ${message}"}]}`);
            return CANCEL;
        } else if (guildAuthority === "멤버") {
            bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text":"§l< §f${guild}§l§f ${guildNum} > = < §b§l멤버§f > §l< §f${title}§l§f >§r ${name} => ${message}"}]}`);
            return CANCEL;
        }
    }
});

events.playerAttack.on((ev) => {
    if (ev.victim.hasTag("길드")) {
        if (ev.victim.getEntityTypeId() == 16778099 || ev.victim.getEntityTypeId() == 307) {
            guildMenu(ev.player.getNetworkIdentifier())
            ev.victim.setNameTag("§l§5[ §f길드 §5]")
            return CANCEL;
        }
        return CANCEL;
    }
})

command.register("길드", "길드메뉴를 엽니다.", CommandPermissionLevel.Normal).overload(async (p, o, op) => {
    const NetworkIdentifier: any = o.getEntity()?.getNetworkIdentifier()
    guildMenu(NetworkIdentifier);
}, {});

command.register("ㄱ", "길드채팅을 합니다.", CommandPermissionLevel.Normal).overload(async (p, o, op) => {
    const playerName: any = o.getName()
    if (guildFileRead[playerName] === undefined) {
        bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c길드를 생성/가입 하시고 길드채팅을 이용해주세요!"}]}`)
    } else {
        const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
        const read = JSON.parse(fs.readFileSync(file, "utf8"))
        const member = Object.keys(read);
        const title = titleFileRead[playerName] || titleBase
        member.forEach(function (element: any, index: any, arr: any) {
            if (read[element] === "멤버" || read[element] === "길드장" || read[element] === "부길드장") {
                let per;
                if (read[element] === "멤버") per = "§b§l멤버§f";
                if (read[element] === "길드장") per = "§c§l길드장§f";
                if (read[element] === "부길드장") per = "§e§l부길드장§f";
                bedrockServer.executeCommand(`tellraw "${element}" {"rawtext":[{"text":"§l§a길드채팅 §f< §f${guildFileRead[playerName]}§l§f ${guildNumberRead[guildFileRead[playerName]]} > = < ${per} > §l< §f${title}§l§f >§r ${playerName} => ${p.text.text}"}]}`);
            }
        })
    }
}, {
    text:CommandRawText
});

async function guildMenu(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    const guildDB = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`

    if (guildFileRead[playerName] === undefined || "") {
        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l길드",
            content: "",
            buttons: [
                {
                    text: "§l§e길드 랭킹"
                },
                {
                    text: "§l§a길드 생성"
                },
                {
                    text: "§l§c길드 가입"
                },
                {
                    text: "§l길드 정보"
                },
                {
                    text: "§l§d길드 찾기"
                }
            ]
        })
        if (res === null) return;

        if (res === 0) {
            rank(ni)
        } else if (res === 1) {
            make(ni)
        } else if (res === 2) {
            join(ni)
        } else if (res === 3) {
            information(ni)
        } else if (res === 4) {
            guildSearch(ni)
        }

    } else if (JSON.parse(fs.readFileSync(guildDB, "utf8"))[playerName] == "길드장") {
        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l길드",
            content: "",
            buttons: [
                {
                    text: "§l§e길드 랭킹"
                },
                {
                    text: "§l§a길드원 목록"
                },
                {
                    text: "§l§d승인 요청함"
                },
                {
                    text: "§e§l길드 관리"
                },
                {
                    text: "§l길드 정보"
                },
                {
                    text: "§l§d길드 찾기"
                }
            ]
        })
        if (res === 1) {
            personnel(ni)
        } else if (res === 5) {
            guildSearch(ni)
        } else if (res === 2) {
            request(ni)
        } else if (res === 4) {
            information(ni)
        } else if (res === 3) {
            management(ni)
        } else if (res === 0) {
            rank(ni)
        }
    } else if (JSON.parse(fs.readFileSync(guildDB, "utf8"))[playerName] == "부길드장") {
        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l길드",
            content: "",
            buttons: [
                {
                    text: "§l§e길드 랭킹"
                },
                {
                    text: "§l§a길드원 목록"
                },
                {
                    text: "§l§d승인 요청함"
                },
                {
                    text: "§l길드 정보"
                },
                {
                    text: "§l§d길드 찾기"
                },
                {
                    text: "§l길드끼리 PVP 설정"
                },
                {
                    text: "§c§l길드원 추방"
                },
                {
                    text: "§4§l길드 탈퇴"
                }
            ]
        })
        if (res === 1) {
            personnel(ni)
        } else if (res === 7) {
            leave(ni)
        } else if (res === 6) {
            kick1(ni)
        } else if (res === 2) {
            request(ni)
        } else if (res === 3) {
            information(ni)
        } else if (res === 0) {
            rank(ni)
        } else if (res === 4) {
            guildSearch(ni)
        } else if (res === 5) {
            attack(ni)
        }
    } else {
        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l길드",
            content: "",
            buttons: [
                {
                    text: "§l§e길드 랭킹"
                },
                {
                    text: "§l§a길드원 목록"
                },
                {
                    text: "§l길드 정보"
                },
                {
                    text: "§l§d길드 찾기"
                },
                {
                    text: "§c§l길드 탈퇴"
                }
            ]
        })
        if (res === 1) {
            personnel(ni)
        } else if (res === 4) {
            leave(ni)
        } else if (res === 2) {
            information(ni)
        } else if (res === 0) {
            rank(ni)
        } else if (res === 3) {
            guildSearch(ni)
        }
    }
}

async function make(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName();
    if (guildFileRead[playerName] === undefined || "") {
        let drop = ['조건 없음', '요청후 승인'];
        let pvps = ['pvp 허용', 'pvp 비허용'];
        const res = await Form.sendTo(ni, {
            type: "custom_form",
            title: "§l길드",
            content: [
                {
                    "type": "label",
                    "text": "나만의 길드를 만들어보세요!"
                },
                {
                    type: "input",
                    text: "길드 이름을 설정해주세요!"
                },
                {
                    type: "input",
                    text: "길드 설명을 설정해주세요!"
                },
                {
                    "type": "dropdown",
                    "text": "길드 가입 조건을 선택해주세요!",
                    "options": drop
                },
                {
                    "type": "dropdown",
                    "text": "길드끼리 PVP를 설정해주세요!",
                    "options": pvps
                }
            ]
        })
        if (res === null) return;

        const name = res[1]
        const explanation = res[2]
        const dropz = res[3]
        const pvp = res[4]

        if (name) {
            if (explanation) {
                if (String(name).length > guildMax) {
                    bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c${guildMax}글자 미만으로 이름을 설정해주세요!"}]}`);
                } else {
                    if (String(explanation).length > explanationMax) {
                        bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c${explanationMax}글자 미만으로 설명을 설정해주세요!"}]}`);
                    } else {
                        if (fs.existsSync(`./${guildDirectory}/${name}`) == false) {
                            fs.mkdirSync(`./${guildDirectory}/${name}`);

                            let Data = {};
                            Data = { name, explanation, max: max, now: 1, guildNumber: guildNumber1Read.number + 1, dropz, pvp }

                            fs.writeFileSync(`./${guildDirectory}/${name}/DB.json`, JSON.stringify(Data));

                            const guildDB = JSON.parse(fs.readFileSync(`./${guildDirectory}/${name}/DB.json`, "utf8"))

                            function saveDB() {
                                fs.writeFileSync(`./${guildDirectory}/${name}/DB.json`, JSON.stringify(guildDB), "utf8");
                            }

                            guildDB[playerName] = "길드장";
                            saveDB();
                            guildFileRead[playerName] = name;
                            saveGuild();
                            killFileRead[guildFileRead[playerName]] = 0;
                            saveKill();
                            delete requestFileRead[playerName];
                            saveRequest();
                            guildNumberRead[guildFileRead[playerName]] = guildNumber1Read.number + 1
                            saveGuildNumber();
                            guildNumber1Read.number = guildNumber1Read.number + 1
                            saveGuildNumber1();

                            bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§a${name}이라는 길드를 만들었습니다!"}]}`);
                        } else {
                            bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c${name}은 이미 있습니다!"}]}`);
                        }
                    }
                }
            } else {
                bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c길드 설명을 설정해주세요!"}]}`);
            }
        } else {
            bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c길드 이름을 설정해주세요!"}]}`);
        }
    } else {
        bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§cError!\n당신은 이미 길드를 만들었습니다! \n이 메세지가 보일경우 방장을 부르세요!"}]}`);
    }
}

async function rank(ni: NetworkIdentifier) {
    let array: any[] = [];
    let killFile2: any = {};
    Object.assign(killFile2, killFileRead)
    const killFile3 = Object.values(killFile2)
    killFile3.sort(function (a: any, b: any) {
        return b - a;
    });
    killFile3.forEach(function (element: any, index: any, arr: any) {
        const keys: any = Object.keys(killFile2).find(key => killFile2[key] === element)
        if (keys === undefined) return;
        const file = `./${guildDirectory}/${keys}/DB.json`
        const read = JSON.parse(fs.readFileSync(file, "utf8"))
        const leader: any = Object.keys(read).find(key => read[key] === "길드장")
        let numc = 'th'
        if (String(index + 1)[String(index + 1).length - 1] == '1') numc = 'st';
        if (String(index + 1)[String(index + 1).length - 1] == '2') numc = 'nd';
        if (String(index + 1)[String(index + 1).length - 1] == '3') numc = 'rd';
        let s = `§l\n${index + 1}${numc}. §6${keys} §7( ${read.now} / ${read.max} ) ${killFileRead[keys]}킬 §7- ${leader}(길드장)\n\n§f---------------------------------`;
        array.push(s);
        delete killFile2[keys]
    })
    const res = await Form.sendTo(ni, {
        type: "form",
        title: "§l길드",
        content: String(array).replace(/,/gi, '\n'),
        buttons: []
    })
}

async function join(ni: NetworkIdentifier) {
    const guild: any = Object.values(guildFileRead)
    let drop: any = [...new Set(guild)];
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                "type": "dropdown",
                "text": "가입하려는 길드를 선택해주세요!",
                "options": drop
            }
        ]
    })
    if (res === null) return;
    const name = res[0]
    if (drop[name] == undefined) {
        bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§c길드를 선택해주세요!"}]}`);
    } else {
        const file = `./${guildDirectory}/${drop[name]}/DB.json`
        const read = JSON.parse(fs.readFileSync(file, "utf8"))
        const playerName: any = ni.getActor()?.getName()
        if (read[playerName] == "kick") {
            bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§c당신은 해당 길드에서 추방되었습니다!"}]}`);
        } else {
            if (read["max"] > read["now"]) {
                if (read["dropz"] == 0) {
                    function saveDB() {
                        fs.writeFileSync(`./${guildDirectory}/${drop[name]}/DB.json`, JSON.stringify(read), "utf8");
                    }
                    read[playerName] = "멤버";
                    saveDB();
                    guildFileRead[playerName] = drop[name];
                    saveGuild();
                    delete requestFileRead[playerName]
                    saveRequest()
                    read.now = read.now + 1
                    saveDB();
                    bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§a${drop[name]}길드에 성공적으로 가입했습니다!"}]}`);
                } else {
                    const leader = Object.keys(read).find(key => read[key] === "길드장")
                    requestFileRead[playerName] = drop[name]
                    saveRequest()
                    bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§a해당 길드에 승인 요청을 보냈습니다!"}]}`);
                    bedrockServer.executeCommand(`tellraw "${leader}" {"rawtext":[{"text":"§a길드 승인 요청이 왔습니다!"}]}`);
                }
            } else {
                bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§c현재 해당 길드의 인원이 너무 많아 해당 길드에는 가입이 안됩니다!"}]}`);
            }
        }
    }
}

async function personnel(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
    const read = JSON.parse(fs.readFileSync(file, "utf8"))
    const leader = Object.keys(read).find(key => read[key] === "길드장")
    const subleader = Object.keys(read).find(key => read[key] === "부길드장") || "없음"
    let array: any[] = [];
    const member = Object.keys(read);
    member.forEach(function (element: any, index: any, arr: any) {
        if (read[element] === "멤버") {
            let s = `§f\n${element}`
            array.push(s)
        }
    })
    const res = await Form.sendTo(ni, {
        type: "form",
        title: "§l길드",
        content: `§l총 길드원: (${read.now} / ${read.max})\n§6§l----길드장----\n§f${String(leader)}\n\n§6§l----부길드장----\n§f${String(subleader)}\n\n§6§l----맴버----${String(array).replace(/,/gi, '')}§f`,
        buttons: []
    })
}

async function leave(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
    const read = JSON.parse(fs.readFileSync(file, "utf8"))
    const res = await Form.sendTo(ni, {
        type: "modal",
        title: "§l길드",
        content: "길드를 나가시겠습니까?",
        button1: "§l§a네",
        button2: "§l§c아니요"
    })
    if (res === null) return;
    if (res === true) {
        bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§a성공적으로 (${guildFileRead[playerName]})길드에 나갔습니다!"}]}`);
        delete read[playerName]
        read.now = read.now - 1
        fs.writeFileSync(file, JSON.stringify(read), "utf8");
        delete guildFileRead[playerName]
        saveGuild()
    }
}

async function kick1(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
    const read = JSON.parse(fs.readFileSync(file, "utf8"))
    const member = Object.keys(read);
    let array: any[] = [];
    member.forEach(function (element: any, index: any, arr: any) {
        if (read[element] === "멤버" || read[element] === "부길드장") {
            let s = `${element}`
            array.push(s)
        }
    })
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                "type": "dropdown",
                "text": "추방하려는 길드원을 선택해주세요!",
                "options": array
            }
        ]
    })
    if (res === null) return;
    const kick = res[0]
    const kickPlayer = array[kick]
    if (array[kick] == undefined) {
        bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c플레이어를 선택해주세요!"}]}`);
    } else {
        if (res !== undefined) {
            const res = await Form.sendTo(ni, {
                type: "modal",
                title: "§l길드",
                content: `${kickPlayer}님을 추방하시겠습니까?`,
                button1: "§l§a네",
                button2: "§l§c아니요"
            })
            if (res === null) return;
            if (res) {
                bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§a성공적으로 ${kickPlayer}님을 추방했습니다!"}]}`);
                bedrockServer.executeCommand(`tellraw "${kickPlayer}" {"rawtext":[{"text":"§c당신은 ${playerName}님에 의해 추방당했습니다!"}]}`);
                delete read[kickPlayer]
                read.now = read.now - 1
                fs.writeFileSync(file, JSON.stringify(read), "utf8");
                delete guildFileRead[kickPlayer]
                saveGuild()
            }
        }
    }
}

async function leave1(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
    const files = `./${guildDirectory}/${guildFileRead[playerName]}`
    const read = JSON.parse(fs.readFileSync(file, "utf8"))
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                type: "input",
                text: "길드를 해산하려면 확인을 적어주세요!"
            }
        ]
    })
    if (res === null) return;
    const input = res[0]
    if (input == "확인") {
        let array: any[] = [];
        const member = Object.keys(read);
        delete killFileRead[guildFileRead[playerName]]
        saveKill();
        member.forEach(function (element: any, index: any, arr: any) {
            if (read[element] === "멤버" || read[element] === "부길드장" || read[element] === "길드장") {
                delete guildFileRead[element]
                saveGuild()
            }
        })
        fs.unlinkSync(file)
        fs.rmdirSync(files, { recursive: true })
        bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§a성공적으로 길드를 해산했습니다!"}]}`);
    }
}

async function request(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    let array: any[] = [];
    const member = Object.keys(requestFileRead);
    member.forEach(function (element: any, index: any, arr: any) {
        if (requestFileRead[element] === guildFileRead[playerName]) {
            let s = `${element}`
            array.push(s)
        }
    })
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                "type": "dropdown",
                "text": "요청을 승인 하려는 사람을 선택하세요!",
                "options": array
            }
        ]
    })
    if (res === null) return;
    const name = res[0]
    if (array[name] == undefined) {
        bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§c플레이어를 선택해주세요!"}]}`);
    } else {
        const names: any = array[name]
        const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
        const read = JSON.parse(fs.readFileSync(file, "utf8"))
        function saveDB() {
            fs.writeFileSync(`./${guildDirectory}/${guildFileRead[playerName]}/DB.json`, JSON.stringify(read), "utf8");
        }
        if (read.now >= read.max) {
            bedrockServer.executeCommand(`tellraw "${names}" {"rawtext":[{"text":"§c길드원이 너무 많아 승인을 하지 못했습니다!"}]}`);
        } else {
            read[names] = "멤버";
            read.now = read.now + 1
            saveDB();
            guildFileRead[names] = guildFileRead[playerName];
            saveGuild();
            delete requestFileRead[names]
            saveRequest()
            bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§a${array[name]}님의 요청을 승인했습니다!"}]}`);
            bedrockServer.executeCommand(`tellraw "${array[name]}" {"rawtext":[{"text":"§a${playerName}님이 승인해 ${guildFileRead[playerName]}길드에 가입했습니다!"}]}`);
        }
    }
}

async function information(ni: NetworkIdentifier) {
    const guild: any = Object.values(guildFileRead)
    let drop: any = [...new Set(guild)];
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                type: "dropdown",
                text: "길드 정보를 확인할 길드를 선택해주세요!",
                options: drop
            }
        ]
    })
    if (res === null) return;
    const name = res[0]
    if (drop[name] == undefined) {
        bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§c길드를 선택해주세요!"}]}`);
    } else {
        const guilds: any = drop[name]
        const file = `./${guildDirectory}/${guilds}/DB.json`
        const read = JSON.parse(fs.readFileSync(file, "utf8"))
        const leader = Object.keys(read).find(key => read[key] === "길드장")
        const subleader = Object.keys(read).find(key => read[key] === "부길드장") || "없음"
        let array: any[] = [];
        const member = Object.keys(read);
        member.forEach(function (element: any, index: any, arr: any) {
            if (read[element] === "멤버") {
                let s = `§f\n${element}`
                array.push(s)
            }
        })
        let arrays: any[] = [];
        let killFile2: any = {};
        Object.assign(killFile2, killFileRead)
        const killFile3 = Object.values(killFile2)
        killFile3.sort(function (a: any, b: any) {
            return b - a;
        });
        killFile3.forEach(function (element: any, index: any, arr: any) {
            const keys: any = Object.keys(killFile2).find(key => killFile2[key] === element)
            if (keys === undefined) return;
            let numc = 'th'
            if (String(index + 1)[String(index + 1).length - 1] == '1') numc = 'st';
            if (String(index + 1)[String(index + 1).length - 1] == '2') numc = 'nd';
            if (String(index + 1)[String(index + 1).length - 1] == '3') numc = 'rd';
            if (keys == guilds) {
                let save = `${index + 1}${numc}`
                arrays.push(save)
            }
            delete killFile2[keys]
        })
        if (res) {
            const drop = ["조건 없음", "요청후 승인"]
            const drops = ['길드끼리 pvp 허용', '길드끼리 pvp 비허용'];
            const res = await Form.sendTo(ni, {
                type: "form",
                title: "§l길드",
                content: `§l${arrays[0]} ${read.name} (${drop[read.dropz]})\nPVP: ${drops[read.pvp]}\n길드 설명: ${read.explanation}\n총 길드원: (${read.now} / ${read.max}) ${killFileRead[read.name]}킬\n§6§l----길드장----\n§f${String(leader)}\n\n§6§l----부길드장----\n§f${String(subleader)}\n\n§6§l----맴버----${String(array).replace(/,/gi, '')}§f`,
                buttons: []
            })
        }
    }
}

async function management(ni: NetworkIdentifier) {
    const res = await Form.sendTo(ni, {
        type: "form",
        title: "§l길드 관리",
        content: "",
        buttons: [
            {
                "text": "§l길드 설명 변경"
            },
            {
                "text": "§l가입 조건 변경"
            },
            {
                "text": "§l길드끼리 PVP 설정"
            },
            {
                "text": "§l길드원 추방"
            },
            {
                "text": "§l부길드장 임명"
            },
            {
                "text": "§l길드장 넘기기"
            },
            {
                "text": "§l길드 해산"
            }
        ]
    })
    if (res === 6) {
        leave1(ni)
    } else if (res === 0) {
        setExplanation(ni)
    } else if (res === 3) {
        kick1(ni)
    } else if (res === 1) {
        condition(ni)
    } else if (res === 5) {
        Glead(ni)
    } else if (res === 4) {
        subLeader(ni)
    } else if (res === 2) {
        attack(ni)
    }
}

async function setExplanation(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
    const read = JSON.parse(fs.readFileSync(file, "utf8"))
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                "type": "label",
                "text": `기존 길드 설명: ${read.explanation}`
            },
            {
                type: "input",
                text: "바꿀 길드 설명을 써주세요!"
            }
        ]
    })
    if (res === null) return;
    const newExplanation = res[1]
    if (newExplanation) {
        read.explanation = newExplanation
        function saveDB() {
            fs.writeFileSync(`./${guildDirectory}/${guildFileRead[playerName]}/DB.json`, JSON.stringify(read), "utf8");
        }
        const read1 = JSON.parse(fs.readFileSync(file, "utf8"))
        saveDB();
        bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§a성공적으로 설명을 ${read1.explanation}에서 ${newExplanation}으로 바꿨습니다!"}]}`);
    } else {
        bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c길드 설명을 써주세요!"}]}`);
    }
}

async function condition(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
    const read = JSON.parse(fs.readFileSync(file, "utf8"))
    let drop = ['조건 없음', '요청후 승인'];
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                "type": "label",
                "text": `기존 길드 가입 조건: ${drop[read.dropz]}`
            },
            {
                "type": "dropdown",
                "text": "바꿀 길드 가입조건을 선택해주세요!",
                "options": drop
            }
        ]
    })
    if (res === null) return;
    const newCondition = res[1]
    read.dropz = newCondition
    function saveDB() {
        fs.writeFileSync(`./${guildDirectory}/${guildFileRead[playerName]}/DB.json`, JSON.stringify(read), "utf8");
    }
    const read1 = JSON.parse(fs.readFileSync(file, "utf8"))
    saveDB();
    bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§a성공적으로 가입 조건을 ${drop[read1.dropz]}에서 ${drop[newCondition]}으로 바꿨습니다!"}]}`);
}

async function subLeader(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
    const read = JSON.parse(fs.readFileSync(file, "utf8"))
    let array: any[] = ["부길드장 선택 안함"];
    const member = Object.keys(read);
    member.forEach(function (element: any, index: any, arr: any) {
        if (read[element] === "멤버") {
            let s = `${element}`
            array.push(s)
        }
    })
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                "type": "label",
                "text": `기존 길드 부길드장: ${Object.keys(read).find(key => read[key] === "부길드장") || "없음"}`
            },
            {
                "type": "dropdown",
                "text": "부길드장 임명할 사람을 선택해주세요!",
                "options": array
            }
        ]
    })
    if (res === null) return;
    const newSubLeader = res[1]
    const newSubLeaders: any = array[newSubLeader]
    function saveDB() {
        fs.writeFileSync(`./${guildDirectory}/${guildFileRead[playerName]}/DB.json`, JSON.stringify(read), "utf8");
    }
    const subLeader: any = Object.keys(read).find(key => read[key] === "부길드장")
    if (newSubLeader == 0) {
        if (subLeader == undefined) {
            bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§a성공적으로 부길드장을 없음에서 없음으로 바꿨습니다!"}]}`);
        } else {
            read[subLeader] = "멤버"
            bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§a성공적으로 부길드장을 ${subLeader}에서 없음으로 바꿨습니다!"}]}`);
            saveDB()
        }
    } else {
        if (subLeader == undefined) {
            read[newSubLeaders] = "부길드장"
            saveDB()
            bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§a성공적으로 부길드장 없음에서 ${newSubLeaders}으로 바꿨습니다!"}]}`);
            bedrockServer.executeCommand(`tellraw "${newSubLeaders}" {"rawtext":[{"text":"§a당신은 ${guildFileRead[playerName]}길드의 부길드장이 되었습니다!"}]}`);
        } else {
            read[subLeader] = "멤버"
            read[newSubLeaders] = "부길드장"
            saveDB()
            bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§a성공적으로 부길드장을 ${subLeader}에서 ${newSubLeaders}으로 바꿨습니다!"}]}`);
        }
    }
}

async function Glead(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
    const read = JSON.parse(fs.readFileSync(file, "utf8"))
    const member = Object.keys(read);
    let array: any[] = [];
    member.forEach(function (element: any, index: any, arr: any) {
        if (read[element] === "멤버" || read[element] === "부길드장") {
            let s = `${element}`
            array.push(s)
        }
    })
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                "type": "dropdown",
                "text": "길드장을 넘겨줄 길드원을 선택하세요!",
                "options": array
            }
        ]
    })
    if (res === null) return;
    const guild = res[0]
    const guildPlayer = array[guild]
    if (array[guild] == undefined) {
        bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c플레이어를 선택해주세요!"}]}`);
    } else {
        if (res !== undefined) {
            const res = await Form.sendTo(ni, {
                type: "modal",
                title: "§l길드",
                content: `${guildPlayer}님에게 길드장을 넘길건가요?`,
                button1: "§l§a네",
                button2: "§l§c아니요"
            })
            if (res === null) return;
            if (res) {
                bedrockServer.executeCommand(`tellraw "${ni.getActor()?.getName()}" {"rawtext":[{"text":"§a성공적으로 ${guildPlayer}님에게 길드장을 넘겨주었습니다!"}]}`);
                bedrockServer.executeCommand(`tellraw "${guildPlayer}" {"rawtext":[{"text":"§a당신은 ${guildFileRead[playerName]}길드의 길드장이 되었습니다!"}]}`);
                read[guildPlayer] = "길드장"
                read[playerName] = "멤버"
                fs.writeFileSync(file, JSON.stringify(read), "utf8");
            }
        }
    }
}

async function guildSearch(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    let drop = ["길드이름 검색", "길드번호 검색"];
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                "type": "dropdown",
                "text": "어떤방식으로 길드를 찾을건지 선택하세요.",
                "options": drop
            },
            {
                type: "input",
                text: "길드를 검색해보세요!"
            }
        ]
    })
    if (res === null) return;
    const search = res[0]
    const searchGuild = res[1]
    if (search == 1) {
        const number = searchGuild.replace(/[^0-9]/g, ' ')
        if (number > guildNumber1Read.number) {
            bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c해당 길드 번호는 등록되어 있지 않은 길드번호 입니다."}]}`);
        } else {
            if (number == undefined || number.includes(' ')) {
                bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c길드 번호로 찾으시려면 숫자를 써주세요."}]}`);
            } else {
                const guildNum = Object.values(guildNumberRead)
                let guild: any = []
                guildNum.forEach(function (element: any, index: any, arr: any) {
                    const keys: any = Object.keys(guildNumberRead).find(key => guildNumberRead[key] === element)
                    if (keys === undefined) return;
                    if (guildNumberRead[keys] == searchGuild) {
                        guild.push(keys)
                    }
                })
                if (fs.existsSync(`./${guildDirectory}/${guild}/DB.json`) == false) {
                    bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c해당 길드는 해산한 길드입니다."}]}`);
                } else {
                    const guilds: any = guild[0]
                    const file = `./${guildDirectory}/${guilds}/DB.json`
                    const read = JSON.parse(fs.readFileSync(file, "utf8"))
                    const leader = Object.keys(read).find(key => read[key] === "길드장")
                    const subleader = Object.keys(read).find(key => read[key] === "부길드장") || "없음"
                    let array: any[] = [];
                    const member = Object.keys(read);
                    member.forEach(function (element: any, index: any, arr: any) {
                        if (read[element] === "멤버") {
                            let s = `§f\n${element}`
                            array.push(s)
                        }
                    })
                    let arrays: any[] = [];
                    let killFile2: any = {};
                    Object.assign(killFile2, killFileRead)
                    const killFile3 = Object.values(killFile2)
                    killFile3.sort(function (a: any, b: any) {
                        return b - a;
                    });
                    killFile3.forEach(function (element: any, index: any, arr: any) {
                        const keys: any = Object.keys(killFile2).find(key => killFile2[key] === element)
                        if (keys === undefined) return;
                        let numc = 'th'
                        if (String(index + 1)[String(index + 1).length - 1] == '1') numc = 'st';
                        if (String(index + 1)[String(index + 1).length - 1] == '2') numc = 'nd';
                        if (String(index + 1)[String(index + 1).length - 1] == '3') numc = 'rd';
                        if (keys == guilds) {
                            let save = `${index + 1}${numc}`
                            arrays.push(save)
                        }
                        delete killFile2[keys]
                    })
                    if (res) {
                        const drop = ["조건 없음", "요청후 승인"]
                        const res = await Form.sendTo(ni, {
                            type: "form",
                            title: "§l길드",
                            content: `§l${arrays[0]} ${read.name} (${drop[read.dropz]})\n길드 설명: ${read.explanation}\n총 길드원: (${read.now} / ${read.max}) ${killFileRead[read.name]}킬\n§6§l----길드장----\n§f${String(leader)}\n\n§6§l----부길드장----\n§f${String(subleader)}\n\n§6§l----맴버----${String(array).replace(/,/gi, '')}§f`,
                            buttons: []
                        })
                    }
                }
            }
        }
    } else {
        if (fs.existsSync(`./${guildDirectory}/${searchGuild}/DB.json`) == false) {
            bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§c해당 길드를 찾지 못했습니다."}]}`);
        } else {
            const file = `./${guildDirectory}/${searchGuild}/DB.json`
            const read = JSON.parse(fs.readFileSync(file, "utf8"))
            const leader = Object.keys(read).find(key => read[key] === "길드장")
            const subleader = Object.keys(read).find(key => read[key] === "부길드장") || "없음"
            let array: any[] = [];
            const member = Object.keys(read);
            member.forEach(function (element: any, index: any, arr: any) {
                if (read[element] === "멤버") {
                    let s = `§f\n${element}`
                    array.push(s)
                }
            })
            let arrays: any[] = [];
            let killFile2: any = {};
            Object.assign(killFile2, killFileRead)
            const killFile3 = Object.values(killFile2)
            killFile3.sort(function (a: any, b: any) {
                return b - a;
            });
            killFile3.forEach(function (element: any, index: any, arr: any) {
                const keys: any = Object.keys(killFile2).find(key => killFile2[key] === element)
                if (keys === undefined) return;
                let numc = 'th'
                if (String(index + 1)[String(index + 1).length - 1] == '1') numc = 'st';
                if (String(index + 1)[String(index + 1).length - 1] == '2') numc = 'nd';
                if (String(index + 1)[String(index + 1).length - 1] == '3') numc = 'rd';
                if (keys == searchGuild) {
                    let save = `${index + 1}${numc}`
                    arrays.push(save)
                }
                delete killFile2[keys]
            })
            if (res) {
                const drop = ["조건 없음", "요청후 승인"]
                const res = await Form.sendTo(ni, {
                    type: "form",
                    title: "§l길드",
                    content: `§l${arrays[0]} ${read.name} (${drop[read.dropz]})\n길드 설명: ${read.explanation}\n총 길드원: (${read.now} / ${read.max}) ${killFileRead[read.name]}킬\n§6§l----길드장----\n§f${String(leader)}\n\n§6§l----부길드장----\n§f${String(subleader)}\n\n§6§l----맴버----${String(array).replace(/,/gi, '')}§f`,
                    buttons: []
                })
            }
        }
    }
}

async function attack(ni: NetworkIdentifier) {
    const playerName: any = ni.getActor()?.getName()
    const file = `./${guildDirectory}/${guildFileRead[playerName]}/DB.json`
    const read = JSON.parse(fs.readFileSync(file, "utf8"))
    let drop = ['pvp 허용', 'pvp 비허용'];
    const res = await Form.sendTo(ni, {
        type: "custom_form",
        title: "§l길드",
        content: [
            {
                "type": "label",
                "text": `기존 길드끼리 PVP 설정: ${drop[read.pvp]}`
            },
            {
                "type": "dropdown",
                "text": "바꿀 길드끼리 PVP를 설정해주세요!",
                "options": drop
            }
        ]
    })
    if (res === null) return;
    const newPvp = res[1]
    read.pvp = newPvp
    function saveDB() {
        fs.writeFileSync(`./${guildDirectory}/${guildFileRead[playerName]}/DB.json`, JSON.stringify(read), "utf8");
    }
    const read1 = JSON.parse(fs.readFileSync(file, "utf8"))
    saveDB();
    bedrockServer.executeCommand(`tellraw "${playerName}" {"rawtext":[{"text":"§a성공적으로 길드끼리 PVP 설정을 ${drop[read1.pvp]}에서 ${drop[newPvp]}으로 바꿨습니다!"}]}`);
}

if (titlestyle == "a") {
    command.register("칭호", "플레이어의 칭호를 성절합니다.", CommandPermissionLevel.Operator).overload(
        (params, origin, output) => {
            if (params.title !== undefined && params.target !== undefined) {
                for (const player of params.target.newResults(origin, ServerPlayer)) {
                    const username = player.getName();
                    const target = params.target.newResults(origin)!;
                    const title = params.title;
                    const legnth = target.length;

                    for (let i = 0; i < legnth; i++) {
                        if (title.length < titleMaxLength) {
                            titleFileRead[username] = title;
                            saveTitle();
                            bedrockServer.executeCommand(`tellraw "${username}" {"rawtext":[{"text":"§a해당 유저의 칭호를 ${title}으로 설정했습니다."}]}`);
                        } else {
                            bedrockServer.executeCommand(`tellraw "${username}" {"rawtext":[{"text":"§c${titleMaxLength}글자 미만으로 칭호를 설정해주세요."}]}`);
                        }
                    }
                }
            }
        },
        {
            target: ActorWildcardCommandSelector,
            title: CxxString,
        },
    );
} else if (titlestyle == "b") {
    command.register("칭호", "플레이어의 칭호를 설정합니다.", CommandPermissionLevel.Normal).overload(async (params, origin, output) => {
        const actor = origin.getEntity();
        const ni = actor!.getNetworkIdentifier();
        const username = actor!.getName();

        const res = await Form.sendTo(ni, {
            type: "custom_form",
            title: "§l칭호",
            content: [
                {
                    type: "input",
                    text: "§l§7사용할 칭호를 입력하세요. ",
                    default: "§l§a칭호",
                },
            ],
        });

        if (res === null) return;

        if (res[0].length < titleMaxLength) {
            titleFileRead[username] = res[0];
            const prefix = res[0];

            if (res[0] !== undefined && username !== undefined) {
                titleFileRead[username] = prefix
                saveTitle();
            }
            bedrockServer.executeCommand(`tellraw "${username}" {"rawtext":[{"text":"§a칭호를 ${prefix}으로 설정했습니다."}]}`);
        } else {
            bedrockServer.executeCommand(`tellraw "${username}" {"rawtext":[{"text":"§c${titleMaxLength}글자 미만으로 칭호를 설정해주세요."}]}`);
        }
    }, {});
}
