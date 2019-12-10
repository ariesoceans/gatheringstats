'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';

import NotFound from './NotFound.react.js';
import PlayerLink from './PlayerLink.react.js';
import Tournaments from './Tournaments.js';
import {formatMoney} from './utils.js';
import Players from './Players.js';

const Tournament = props => {
  const id = props.params.id;
  const t = Tournaments.byID(id);
  const surrounding = Tournaments.page(t);
  const prev = surrounding[0];
  const next = surrounding[1];
  if (!t) {
    return <NotFound />;
  }
  return (
    <div className="col-md-offset-3 col-md-6">
      <DocumentTitle title={t.name} />
      <nav aria-label="...">
        <ul className="pager">
          {prev ? <li className="previous"><a href={"/tournament/" + prev.id}><span aria-hidden="true">&larr;</span> {prev.name}</a></li> : ''}
          {next ? <li className="next"><a href={"/tournament/" + next.id}>{next.name} <span aria-hidden="true">&rarr;</span></a></li> : ''}
        </ul>
      </nav>
      <div className="page-header pageHeader">
        <h1>{t.coverage ? <a href={t.coverage}>{t.name}</a> : t.name}</h1>
        <p className="lead tournamentLead">{t.formats.join(', ')} ({t.medium})</p>
        <p className="lead tournamentLead">{t.date}</p>
        <p className="lead tournamentLead">{t.location}</p>
      </div>
      <table className="table standingsTable table-hover">
        <thead>
          <tr>
            <th />
            <th>Player</th>
            {t.type === 'Pro Tour' || t.type === 'Magic Pro League' || t.type === 'Arena Mythic Championship Qualifier' ? <th>Mythic Points</th> : null}
            {t.type === 'Pro Tour' || t.type === 'Grand Prix' || t.type === 'WMC' || t.type === 'World Championships' ? <th>Pro Points</th> : null}
            <th>Prize Money</th>
          </tr>
        </thead>
        <tbody>
          {t.standings.map((p, index) => {
            return (
              <tr className={t.getPlayerClassName(index)} key={p.id}>
                <td>{p.rank || t.getPlayerIndex(index) + 1}</td>
                <td>
                  <PlayerLink player={Players.byID(p.id)} countryOverrides={t.getNationalityInfo(index)}/>{' '}
                  {p.report ? <a href={p.report}>(report)</a> : null}
                </td>
                {t.type === 'Pro Tour' || t.type === 'Magic Pro League' || t.type === 'Arena Mythic Championship Qualifier' ? <td>{p.mythicpoints}</td> : null}
                {t.type === 'Pro Tour' || t.type === 'Grand Prix' || t.type === 'WMC' || t.type === 'World Championships' ? <td>{p.propoints}</td> : null}
                <td>{formatMoney(p.money)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tournament;
