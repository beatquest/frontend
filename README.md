# Beatquest

> *A Beat Saber Player Elo and Tournament Tracker*
>
> **Built For**: UC Berkeley Info 253A (Fall 2021) Final Project
>
> [Beatquest Website](https://beatquest.com)

# API Specs

* **API Endpoint**: [https://api.beatquest.com](https://api.beatquest.com)

## Leaderboard Specs

### Player Model

> `Rank`, `Country` are enums. `UUID` is a Uint.

| Property      | Type                |
|---------------|---------------------|
| `id`          | `UUID`              |
| `name`        | `String`            |
| `location`    | `Country`           |
| `elo`	        | `int`               |
| `norms`       | `int`               |
| `delta`       | `int`               |
| `matches`     | `int`               |
| `wins`        | `int`               |
| `loses`       | `int`               |
| `rank`        | `Rank`              |
| `image`       | `URL`               |

### Payload Contract

GET "<API Endpoint>" + /leaderboard

OK 200 Response

``` json
{"success":true,"data":[{"id":"386142373622841344","name":"Tseska","country":"FI","elo":2500,"norms":20,"delta":0,"matches":35,"wins":77,"losses":22,"rank":"LM","image":"https://api.beatquest.com/profile/386142373622841344"},{"id":"241387804146270209","name":"cerret","country":"US","elo":2416,"norms":22,"delta":11,"matches":25,"wins":69,"losses":11,"rank":"LM","image":"https://api.beatquest.com/profile/241387804146270209"}]}
```

## Events Specs

### Event Preview Model

| Property      | Type                |
|---------------|---------------------|
| `id`          | `UUID`              |
| `name`        | `String`            |
| `image`       | `URL`               |
| `matches`     | `int`               |

### Payload Contract

GET "<API Enpoint>" + /events

```json
{"success":true,"data":[{"id":"k_2147484041","name":"BeatKhana!'s Rumble Royale","image":"https://beatkhana.com/assets/images/2147484041.webp","matches":0},{"id":"k_2147484051","name":"Simply Sabers Division AAA","image":"https://beatkhana.com/assets/images/2147484051.webp","matches":0},{"id":"k_2147484061","name":"Beat Saber League Season 1","image":"https://beatkhana.com/assets/images/2147484061.webp","matches":0}]}
```

## Event Spec

### Event Model

> `data` key

| Property      | Type                |
|---------------|---------------------|
| `id`          | `UUID`              |
| `info`        | `Info`              |
| `matches`	    | `Match[]`           |

#### Info Model

| Property      | Type                |
|---------------|---------------------|
| `name`        | `String`            |
| `description` | `String`            |
| `source`	    | `String`            |
| `dates`       | `DateDelta`         |
| `links`       | `Links`             |

#### Matches Model

| Property      | Type                |
|---------------|---------------------|
| `matches`     | `Match[]`           |


#### DateDelta Model

> Dates are in ISO 8601 format

| Property      | Type                |
|---------------|---------------------|
| `start`       | `Date`              |
| `end`         | `Date`              |

#### Links Model

| Property      | Type                |
|---------------|---------------------|
| `discord`     | `URI`               |
| `twitch`      | `URI`               |
| `site`        | `URI`               |

#### Match Model

| Property      | Type                |
|---------------|---------------------|
| `time`        | `ISO8601 Date`      |
| `p1`          | `Competitor`        |
| `p2`          | `Competitor`        |

##### Competitor Model

| Property      | Type                |
|---------------|---------------------|
| `id`          | `URI`               |
| `name`        | `String`            |
| `country`     | `String`            |
| `elo`         | `EloDelta`          |
| `rank`        | `RankDelta`         |

###### EloDelta Model

| Property      | Type                |
|---------------|---------------------|
| `before`      | `int`               |
| `after`       | `int`               |
| `delta`       | `int`               |

###### RankDelta Model

| Property      | Type                |
|---------------|---------------------|
| `before`      | `Rank`              |
| `after`       | `Rank`              |

### Payload Contract

```json
{"success":true,"data":{"id":"k_2147484231","info":{"name":"AT1 - Austrian Tournament 1","image":"https://beatkhana.com/assets/images/2147484231_ngQevXLTkTKmubF.webp","description":"<p><strong>Welcome to AT1 - Austrian Tournament 1!</strong></p>\n\n<p>AT1 is the first ever Austrian-only Tournament, its a 1v1 - 16 Player, Double-Elimination Style Tournament.<br />\nIf you so happen to have the Austrian Flag on Scoresaber, you are welcomed to sign up!</p>\n\n<p><strong>Disclaimer</strong>: Minimum Signups for Tourney Start: 16</p>\n\n<p><strong>Dates:</strong> Qualifiers 16.5 - 23.5 | Matches 29.5 - 30.5</p>\n\n<p><strong>RESULTS:</strong> #1 Yuni, #2 Aurirex, #3 SirAlpha<br />\n<a href=\"https://docs.google.com/spreadsheets/d/1bEHmc5p55NCxVg9c94io6uMSttTNN_UeAjk0zXGopG4/edit?usp=sharing\" target=\"_blank\">Rules &amp; More Info</a></p>\n\n<p><a href=\"https://www.paypal.com/pools/c/8z6bYG0RdJ\" target=\"_blank\">Donate to the Prize Pool</a></p>\n","source":"BeatKhana","dates":{"start":"2021-05-16T10:00:00.000Z","end":"2021-05-30T10:00:00.000Z"},"links":{"discord":"https://discord.gg/TvRkNY2","twitch":"https://www.twitch.tv/beatsaberaustria","site":"https://beatkhana.com/tournament/2147484231"}},"matches":[{"time":"2021-05-29T16:30:00.000Z","p1":{"id":"156647870093590528","name":"AuriRex","country":"AT","elo":{"before":1788,"after":1849,"delta":61},"rank":{"before":"N","after":"QM"},"score":2},"p2":{"id":"185399459746807808","name":"Jonas","country":"AT","elo":{"before":1500,"after":1439,"delta":-61},"rank":{"before":"N","after":"N"},"score":0},"event":{"id":"k_2147484231","name":"AT1 - Austrian Tournament 1","image":"https://beatkhana.com/assets/images/2147484231_ngQevXLTkTKmubF.webp"}},{"time":"2021-05-29T16:30:00.000Z","p1":{"id":"415859647568936960","name":"Prix","country":"AT","elo":{"before":1500,"after":1256,"delta":-244},"rank":{"before":"N","after":"N"},"score":0},"p2":{"id":"638852503416602625","name":"underswing","country":"AT","elo":{"before":1404,"after":1648,"delta":244},"rank":{"before":"N","after":"N"},"score":2},"event":{"id":"k_2147484231","name":"AT1 - Austrian Tournament 1","image":"https://beatkhana.com/assets/images/2147484231_ngQevXLTkTKmubF.webp"}}
```