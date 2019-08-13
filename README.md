# stdserve
Simple command-line http server for stdout, a file or a piece of text
> This utility is intended to be used in local environment
# Installation
via `npm`
```
$ npm install -g stdserve
```
This will install `stdserve` globally and can be accessed via command-line using `stdserve` command
# Usage
Serve text content
```
# serve a file
$ cat a.txt | stdserve

# serve a simple text
$ echo "Hello World" | stdserve
# or
$ stdserve -b "Hello World"
```
If you open `localhost:3000` on browser, you can see the content being served( content of `a.txt` or `Hello world`).
> By default it uses `localhost` and port `3000`. To specify host use `-h` and for port use `-p` option

Share a file over `LAN`
```
# at the serving end
$ cat a.txt | stdserve -h 192.168.1.1 -p 1234
# or
$ stdserve -h 192.168.1.1 -p 1234 < a.txt

# at the receiving end
$ curl 192.168.1.1:1234 -o a.txt
```
Serve content from `stdin`
> Useful when you have large peice of text copied on clipboard and you want to serve it without creating a file
```
$ stdserve
```
The above command prompts for `input`. Paste or type the content and press `Enter`(new line) and `Ctrl+D`
```
$ stdserve -p 1234
<h1>Hello World</h1>

# press Ctrl+D

```
If you check `localhost:1234` on browser you can see `Hello World` appears in bold
# Available Options
|Option|Description|Default|Requirement
| ---- | --------- | ----- | ----- |
|`-p`|Port to use|`3000`|optional
|`-h`|Host address|`localhost`|optional
|`-b`|Response Body(text to serve)||optional
|`-H`|HTTP Headers(ex: `-H "Content-Type:application/json" -H ".."`)||optional
