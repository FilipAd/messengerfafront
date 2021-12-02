//export const serverUrl="http://filipad.ddns.net:9090";

export const serverUrl="http://192.168.1.9:9090";

export const webSocketUrl="/websocket-chat/";

//export const topicsUrl="/topic/user";

export const topicsUrl="/topic/messages/";

export const membersEnd="/members/";

export const signUpEnd="/sign-up/";

export const loginEnd="/login/";

export const homeFrontEnd="/home/";

export const onlineStatusEnd="/onlineStatus";

export const offlineStatusEnd="/offlineStatus";

export const emailTokenFrontEnd="/emailtoken/";

export const emailSendTokenEnd="/sendemail/";

export const emailTokenSubmitEnd="/emailtokenverification/"

export const onlineMembersEnd="online/";

export const sendNoticeOnlineStatusEnd="/sendmessage";

export const membersUrl=serverUrl+membersEnd;

export const sendNoticeOnlineStatusUrl=serverUrl+sendNoticeOnlineStatusEnd;

export const onlineMembersUrl=membersUrl+onlineMembersEnd

export const emailSendTokenUrl=serverUrl+emailSendTokenEnd;

export const emailTokenSubmitUrl=serverUrl+emailTokenSubmitEnd;

export const serverWebSocketUrl=serverUrl+webSocketUrl;

export const signUpUrl=serverUrl+signUpEnd;

export const loginUrl=serverUrl+loginEnd;