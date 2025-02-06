import { getItem, getQueueType, getRune, getRuneTree, getSummonerSpell } from '@/api-services/static';
import { MatchData } from '@/types/api/lol/definitions';
import React from 'react';
import '@/styles/MatchHistory.scss';
import Image from 'next/image';

type Props = Readonly<{
    playerId: string
    matchData: MatchData,
}>;

const Match = async ({
    playerId,
    matchData,
}: Props) => {
    const participants = matchData.participants;
    const player = participants.find(p => p.puuid === playerId);

    if (!player) {
        throw new Error("error");
    }

    const queueType = await getQueueType(matchData.queueId);
    const summonerSpell1 = await getSummonerSpell(player.summonerSpell1Id);
    const summonerSpell2 = await getSummonerSpell(player.summonerSpell2Id);
    const mainRune = await getRune(player.perkStyles[0].perkSelections[0]);
    const subRuneTree = await getRuneTree(player.perkStyles[1].styleId);
    const items = (
        await Promise.all(player.itemIds.map(itemId => {
            return getItem(itemId);
        }))
    ).filter(item => !!item);

    // game
    const gameMins = Math.floor(matchData.duration / 60);
    const gameSeconds = matchData.duration % 60;
    const gameTotalMins = matchData.duration / 60;
    const gameDate = new Date(matchData.startTimestamp).toLocaleDateString(undefined, {  
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });

    // individual
    const csPerMin = (player.cs / gameTotalMins).toFixed(1);
    const kdaRatio = ((player.kills + player.assists) / player.deaths).toFixed(2);
    const totalKillsTeam = participants.reduce((cum, p) => {
        return p.teamId === player.teamId ? cum + p.kills : cum;
    }, 0);
    const kp = totalKillsTeam ? Math.round(((player.kills + player.assists) / totalKillsTeam) * 100) : 0;

    return (
        <div className='match-data'>
        <div className='match-data__meta'>
            <div>{queueType?.description || ''}</div>
            <div>{gameDate}</div>
            <div></div>
            <div>
                {player.win ? (
                    <span className='text-green-600'>Victory</span>
                ) : (
                    <span className='text-red-600'>Defeat</span>
                )}
            </div>
            <div>{gameMins}m {gameSeconds}s</div>
        </div>
        <div className='match-data__player-main'>
            <Image 
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png`}
                alt='champion icon'
                width={128}
                height={128}
                className='match-data__icon match-data__player-champion'
                title={player.championName}
                priority
            />
            <Image
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${summonerSpell1?.iconFilename || 'summoner_empty.png'}`}
                alt='summoner spell 1 icon'
                width={64}
                height={64}
                className="match-data__icon match-data__summ-1"
                title={summonerSpell1?.name || ''}
                priority
            />
            <Image
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${summonerSpell2?.iconFilename || 'summoner_empty.png'}`}
                alt='summoner spell 2 icon'
                width={64}
                height={64}
                className="match-data__icon match-data__summ-2"
                title={summonerSpell2?.name || ''}
                priority
            />
            <Image
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${mainRune?.iconPath || 'runesicon.png'}`}
                alt='main rune icon'
                width={64}
                height={64}
                className="match-data__icon match-data__rune-1"
                title={mainRune?.name || ''}
                priority
            />
            <Image
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${subRuneTree?.iconFilename || 'runesicon.png'}`}
                alt='sub run tree icon'
                width={64}
                height={64}
                className="match-data__icon match-data__rune-2"
                title={subRuneTree?.name || ''}
                priority
            />
            <div className="match-data__kda">
                <span>{player.kills}</span>
                <span>/</span>
                <span>{player.deaths}</span>
                <span>/</span>
                <span>{player.assists}</span>
            </div>
            <div className="match-data__kda-ratio">
                KDA: {kdaRatio}:1
            </div>
            {items.map((item, index) => {
                return (
                    <Image
                        key={item.id} 
                        src={`https://raw.communitydragon.org/latest/game/assets/items/icons2d/${item.iconFilename}`}
                        alt={`item ${index+1} icon`}
                        width={64}
                        height={64}
                        className={`match-data__icon match-data__item-${index+1}`}
                        title={item.name}
                        priority
                    />
                )
            })}
        </div>
        <div className='match-data__player-sub'>
            <div>KP: {kp}%</div>
            <div>CS: {player.cs} ({csPerMin}/min)</div>
        </div>
        <div className='match-data__participants'>
            {participants.map((participant) => {
                return (
                    <div key={participant.puuid} className='match-data__participant'>
                        <Image 
                            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${participant.championId}.png`}
                            alt='champion icon'
                            width={64}
                            height={64}
                            className='match-data__icon match-data__participant-champion'
                            title={participant.championName}
                            priority
                        />
                        <div 
                            className='match-data__participant-name'
                            title={`${participant.summonerName}#${participant.tag}`}
                        >
                            {participant.summonerName}
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
    )
};

export default Match;