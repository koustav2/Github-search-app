/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';



interface GitHubUser {
    login: string | undefined;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string | null;
    blog: string | undefined;
    location: string | undefined;
    email: string | null;
    hireable: boolean | undefined;
    bio: string | undefined;
    twitter_username: string | undefined;
    public_repos: number | undefined;
    public_gists: number;
    followers: number | undefined;
    following: number | undefined;
    created_at: string;
    updated_at: string;
}

interface Error {
    response: string;
    message: string;
    error: string;
}

const BASE_URL = 'https://api.github.com';


export const useUserProfile = (
    username: string
): UseQueryResult<GitHubUser, Error> => {
    return useQuery(
        ['userProfile', username],
        async () => {
            const headers = {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
            };

            const response: AxiosResponse<GitHubUser> = await axios.get(
                `${BASE_URL}/users/${username}`,
                { headers }
            );
            return response.data;
        },
        {
            enabled: false,
        }
    );
};

export const myUserProfile = (): UseQueryResult<GitHubUser, Error> => {
    return useQuery(
        ['userProfile'],
        async () => {
            const headers = {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
            };

            const response: AxiosResponse<GitHubUser> = await axios.get(
                `${BASE_URL}/users/koustav2`,
                { headers }
            );
            return response.data;
        });
};

// Fetch both user repositories and profile
export const useGitHubData = (username: string) => {
    const userProfile = useUserProfile(username);
    return {
        userProfile
    };
};

export const myData = () => {
    const myProfile = myUserProfile();
    return {
        myProfile
    };
};

