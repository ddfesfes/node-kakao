/*
 * Created on Mon Jan 25 2021
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

import { ChannelManageSession } from "../channel/channel-session";
import { ChatLogged, ChatLoggedType } from "../chat/chat";
import { RelayEventType } from "../relay";
import { AsyncCommandResult } from "../request";
import { ChannelUser } from "../user/channel-user";
import { OpenChannelUserInfo } from "../user/channel-user-info";
import { OpenChannelInfo } from "./open-channel-info";
import { OpenLink, OpenLinkProfiles } from ".";
import { OpenChannelUserPerm } from "./open-link-type";
import { OpenLinkChannelUserInfo, OpenLinkKickedUserInfo } from "./open-link-user-info";
import { Channel } from "../channel";


/**
 * Classes which provides openchannel session operations should implement this.
 */
export interface OpenChannelSession {

    /**
     * Mark every chat as read until this chat.
     * @param chat
     */
    markRead(chat: ChatLogged): AsyncCommandResult;

    /**
     * Get latest open channel info
     */
    getLatestChannelInfo(): AsyncCommandResult<OpenChannelInfo>;

    /**
     * Get latest detailed user info.
     * @see ChannelSession.getLatestUserInfo
     *
     * @param channelUser
     */
    getLatestUserInfo(...channelUsers: ChannelUser[]): AsyncCommandResult<OpenChannelUserInfo[]>;

    /**
     * Get every latest user info.
     * @see ChannelSession.getAllLatestUserInfo
     *
     * @param channelUser
     */
    getAllLatestUserInfo(): AsyncCommandResult<OpenChannelUserInfo[]>;

    /**
     * Get kick list of this channel.
     *
     * @see OpenLinkSession.getKickList
     */
    getKickList(): AsyncCommandResult<OpenLinkKickedUserInfo[]>;

    /**
     * Remove user from kick list.
     * @see OpenLinkSession.removeKicked
     *
     * @param user
     */
    removeKicked(user: ChannelUser): AsyncCommandResult;

    /**
     * React(Like) to link.
     * @see OpenLinkSession.react
     *
     * @param flag 
     */
    react(flag: boolean): AsyncCommandResult;

    /**
     * Get reaction info
     * @see OpenLinkSession.getReaction
     */
    getReaction(): AsyncCommandResult<[number, boolean]>;

    /**
     * Kick user. Require manage permission.
     *
     * @param user
     */
    kickUser(user: ChannelUser): AsyncCommandResult;

    /**
     * Get latest channel openlink
     */
    getLatestOpenLink(): AsyncCommandResult<OpenLink>;

    /**
     * Create chat event (ex: shout heart reaction)
     * @param chat 
     */
    createEvent(chat: ChatLoggedType, type: RelayEventType, count: number): AsyncCommandResult;

    /**
     * Set user permission.
     *
     * @param user
     * @param perm
     */
    setUserPerm(user: ChannelUser, perm: OpenChannelUserPerm): AsyncCommandResult;

    /**
     * Handover host to user.
     * Only owner can use this.
     *
     * @param user
     */
    handoverHost(user: ChannelUser): AsyncCommandResult;

    /**
     * Change profile on this open channel.
     *
     * @param profile 
     * 
     * @returns If changed to link profile, it returns OpenLinkChannelUserInfo as result.
     */
    changeProfile(profile: OpenLinkProfiles): AsyncCommandResult<Readonly<OpenLinkChannelUserInfo> | null>;

}

/**
 * Classes which can manage open channels should implement this.
 */
export interface OpenChannelManageSession extends ChannelManageSession {

    /**
     * Leave kicked open channel
     *
     * @param channel 
     */
    leaveKicked(channel: Channel): AsyncCommandResult;

}