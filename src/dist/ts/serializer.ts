/**
 * ng2-nirvana - Nirvana extensions for Angular2
 * @version v0.0.5
 * @link https://github.com/jasoncavaliere/ng2-Nirvana
 * @license MIT
 */
export class Serializer{
    public serialize<T>(arg: T): string {
     return JSON.stringify(arg);
    }
    public deserialize<T>(obj: T, json: string) : T {
        var jsonObj = JSON.parse(json);

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
    }

}