import Promise from "bluebird"
import db from "sqlite"

const QUERY = `SELECT
  location,
  CASE WHEN (SELECT start - strftime('%H:%M:%f', 'now', 'localtime')
             FROM activity_rooms ar
               JOIN activity a ON ar.activity_id = a.id
               JOIN activity_date ad ON ad.activity_id = a.id
             WHERE ad.date = trim(strftime('%d', 'now', 'localtime'), '0') + strftime('%m', 'now', 'localtime') AND ar.room_id = r.id AND
                   start > strftime('%H:%M:%f', 'now', 'localtime')
             ORDER BY start
             LIMIT 1) IS NULL
    THEN '24:00' - strftime('%H:%M:%f', 'now', 'localtime')
  ELSE (SELECT start - strftime('%H:%M:%f', 'now', 'localtime')
        FROM activity_rooms ar
          JOIN activity a ON ar.activity_id = a.id
          JOIN activity_date ad ON ad.activity_id = a.id
        WHERE ad.date = trim(strftime('%d', 'now', 'localtime'), '0') + strftime('%m', 'now', 'localtime') AND ar.room_id = r.id AND
              start > strftime('%H:%M:%f', 'now', 'localtime')
        ORDER BY start
        LIMIT 1) END free_for
FROM room r
WHERE (SELECT count() class
       FROM activity_rooms ar
         JOIN activity a ON ar.activity_id = a.id
         JOIN activity_date ad ON ad.activity_id = a.id
       WHERE ad.date = trim(strftime('%d', 'now', 'localtime'), '0') + strftime('%m', 'now', 'localtime') AND ar.room_id = r.id AND
             start <= strftime('%H:%M:%f', 'now', 'localtime') AND end > strftime('%H:%M:%f', 'now', 'localtime')) = 0`

function conn() {
    return Promise.resolve()
        .then(() => db.open('./timetable.db', { Promise }))
        .catch(err => console.error(err.stack))
}

async function getFreeRooms() {
    await conn()

    let freeRooms = await db.all(QUERY)

    return freeRooms;
}

export default getFreeRooms
