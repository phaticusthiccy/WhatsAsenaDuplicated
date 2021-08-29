#!/bin/sh
# Usage: ./bot.sh 
# A shell script for easy installation. 
# Powered by functions and variables.
# Two different language options are available.#
# For Turkish Users
# For Non-Turkish Users ( English )
# -----------------------------------------------------------------------------

# Functions waiting to be review
: <<'WAIT_FOR_REVIEW'
test () {
  echo "Console Input: $1 and $2"
}
number_one_func () {
   echo "This is the first function speaking..."
   number_two
}
number_two_func () {
   echo "This is now the second function speaking..."
}
_curl()
{
    local cur prev words cword
    _init_completion || return

    case $prev in
        --abstract-unix-socket | --alt-svc | --config | --cookie | \
            --cookie-jar | --dump-header | --egd-file | --etag-compare | \
            --etag-save | --hsts | --key | --libcurl | --netrc-file | \
            --output | --proxy-key | --random-file | --trace | --trace-ascii | \
            --unix-socket | --upload-file | -!(-*)[KbcDoT])
            _filedir
            return
            ;;
        --ciphers | --connect-timeout | --connect-to | --continue-at | \
            --curves | --data-raw | --doh-url | --expect100-timeout | --form | \
            --form-string | --ftp-account | --ftp-alternative-to-user | \
            --happy-eyeballs-timeout-ms | --hostpubmd5 | --keepalive-time | \
            --limit-rate | --local-port | --login-options | --mail-auth | \
            --mail-from | --mail-rcpt | --max-filesize | --max-redirs | \
            --max-time | --pass | --proto | --proto-default | --proto-redir | \
            --proxy-ciphers | --proxy-pass | --proxy-service-name | \
            --proxy-tls13-ciphers | --proxy-tlspassword | --proxy-tlsuser | \
            --proxy-user | --proxy1.0 | --quote | --range | --referer | \
            --resolve | --retry | --retry-delay | --retry-max-time | \
            --sasl-authzid | --service-name | --socks5-gssapi-service | \
            --speed-limit | --speed-time | --telnet-option | --tftp-blksize | \
            --time-cond | --tls13-ciphers | --tlspassword | --tlsuser | \
            --url | --user | --user-agent | --version | --write-out | \
            -!(-*)[CFmQreYytzuAVw])
            return
            ;;
        --cacert | --cert | --proxy-cacert | --proxy-cert | -!(-*)E)
            _filedir "@(c?(e)rt|cer|pem|der)"
            return
            ;;
        --capath | --output-dir | --proxy-capath)
            _filedir -d
            return
            ;;
        --cert-type | --key-type | --proxy-cert-type | --proxy-key-type)
            COMPREPLY=($(compgen -W "DER PEM ENG" -- "$cur"))
            return
            ;;
        --crlfile | --proxy-crlfile)
            _filedir crl
            return
            ;;
        --data | --data-ascii | --data-binary | --data-urlencode | --header | \
            --proxy-header | -!(-*)[dH])
            if [[ $cur == \@* ]]; then
                cur=${cur:1}
                _filedir
                if [[ ${#COMPREPLY[@]} -eq 1 && -d ${COMPREPLY[0]} ]]; then
                    COMPREPLY[0]+=/
                    compopt -o nospace
                fi
                COMPREPLY=("${COMPREPLY[@]/#/@}")
            fi
            return
            ;;
        --delegation)
            COMPREPLY=($(compgen -W "none policy always" -- "$cur"))
            return
            ;;
        --dns-ipv[46]-addr)
            _ip_addresses -${prev:9:1}
            return
            ;;
        --dns-servers | --noproxy)
            _known_hosts_real -- "${cur##*,}"
            ((${#COMPREPLY[@]})) &&
                _comp_delimited , -W '"${COMPREPLY[@]}"'
            return
            ;;
        --engine)
            local engines=$(
                "$1" --engine list 2>/dev/null |
                    command grep "^[[:space:]]"
            )
            COMPREPLY=($(compgen -W "$engines list" -- "$cur"))
            return
            ;;
        --ftp-port | -!(-*)P)
            _available_interfaces -a
            _known_hosts_real -- "$cur"
            _ip_addresses -a
            return
            ;;
        --ftp-method)
            COMPREPLY=($(compgen -W "multicwd nocwd singlecwd" -- "$cur"))
            return
            ;;
        --ftp-ssl-ccc-mode)
            COMPREPLY=($(compgen -W "active passive" -- "$cur"))
            return
            ;;
        --interface)
            _available_interfaces -a
            return
            ;;
        --help | -!(-*)h)
            local x categories=(
                $("$1" --help non-existent-category 2>&1 |
                    awk "/^[[:space:]]/ {print $1}")
            )
            if ((${#categories[@]})); then
                for x in "${categories[@]}"; do
                    # Looks like an option? Likely no --help category support
                    [[ $x != -* ]] || return
                done
                COMPREPLY=($(compgen -W "${categories[@]}" -- "$cur"))
            fi
            return
            ;;
        --krb)
            COMPREPLY=($(compgen -W "clear safe confidential private" -- "$cur"))
            return
            ;;
        --pinnedpubkey | --proxy-pinnedpubkey)
            _filedir "@(pem|der|key)"
            return
            ;;
        --preproxy | --proxy | --socks4 | --socks4a | --socks5 | \
            --socks5-hostname | -!(-*)x)
            _known_hosts_real -- "$cur"
            return
            ;;
        --pubkey)
            _xfunc ssh _ssh_identityfile pub
            return
            ;;
        --request | -!(-*)X)
            # TODO: these are valid for http(s) only
            COMPREPLY=($(
                compgen -W \
                    "GET HEAD POST PUT DELETE CONNECT OPTIONS TRACE PATCH" \
                    -- "$cur"
            ))
            return
            ;;
        --stderr)
            COMPREPLY=($(compgen -W "-" -- "$cur"))
            _filedir
            return
            ;;
        --tls-max)
            COMPREPLY=($(compgen -W "default 1.0 1.1 1.2 1.3" -- "$cur"))
            return
            ;;
        --tlsauthtype | --proxy-tlsauthtype)
            COMPREPLY=($(compgen -W "SRP" -- "$cur"))
            return
            ;;
    esac

    if [[ $cur == -* ]]; then
        COMPREPLY=($(compgen -W "$(_parse_help $1  --help all)" -- "$cur"))
        [[ $COMPREPLY ]] ||
            COMPREPLY=($(compgen -W "$(_parse_help $1)" -- "$cur"))
    fi
} &&
    complete -F _curl curl

_installpkg()
{
    local cur prev words cword
    _init_completion || return

    case "$prev" in
        --root)
            _filedir -d
            return
            ;;
        --priority)
            COMPREPLY=($(compgen -W 'ADD REC OPT SKP' -- "$cur"))
            return
            ;;
        --tagfile)
            _filedir
            return
            ;;
    esac

    if [[ $cur == -* ]]; then
        COMPREPLY=($(compgen -W '--warn --md5sum --root --infobox --terse
            --menu --ask --priority --tagfile' -- "$cur"))
        return
    fi

    _filedir 't[bglx]z'
} &&
    complete -F _installpkg installpkg

_wget()
{
    local cur prev words cword split
    _init_completion -s || return

    case $prev in
        --version | --help | -!(-*)[hV])
            return
            ;;
        --progress)
            COMPREPLY=($(compgen -W 'bar dot' -- "$cur"))
            return
            ;;
        --bind-address)
            _ip_addresses
            return
            ;;
        --domains | --exclude-domains | -!(-*)D)
            _known_hosts_real -- "$cur"
            return
            ;;
        --restrict-file-names)
            local excludes=()
            case $cur in
                *unix* | *windows*)
                    excludes=(windows unix)
                    ;;&
                *lowercase* | *uppercase*)
                    excludes+=(lowercase uppercase)
                    ;;&
                *nocontrol*)
                    excludes+=(nocontrol)
                    ;;&
                *ascii*)
                    excludes+=(ascii)
                    ;;
            esac
            local excludes_str=$(
                export IFS='|'
                echo "${excludes[*]}"
            )

            # prevopt is the previous options string used as a prefix
            # to avoid COMPREPLY replacing them with the $lastopt completion
            local lastopt=${cur/*,/} prevopt=
            [[ $cur == *,* ]] && prevopt=${cur%,*},

            COMPREPLY=($(compgen -P "$prevopt" -X "@($excludes_str)" \
                -W 'unix windows nocontrol ascii lowercase uppercase' \
                -- "$lastopt"))

            # +o nospace when no more valid option is possible (= append a space)
            local opt_as_arr=(${COMPREPLY[0]//,/ })
            ((${#opt_as_arr[@]} < 4)) && compopt -o nospace
            return
            ;;
        --prefer-family)
            COMPREPLY=($(compgen -W 'IPv4 IPv6 none' -- "$cur"))
            return
            ;;
        --directory-prefix | --ca-directory | --warc-tempdir | -!(-*)P)
            _filedir -d
            return
            ;;
        --output-file | --append-output | --config | --load-cookies | \
            --save-cookies | --post-file | --certificate | --ca-certificate | \
            --private-key | --random-file | --egd-file | --warc-file | \
            --warc-dedup | -!(-*)[oa])
            _filedir
            return
            ;;
        --output-document | --input-file | -!(-*)[Oi])
            _filedir && [[ $cur == - || -z $cur ]] && COMPREPLY+=(-)
            return
            ;;
        --secure-protocol)
            COMPREPLY=($(compgen -W 'auto SSLv2 SSLv3 TLSv1' -- "$cur"))
            return
            ;;
        --certificate-type | --private-key-type)
            COMPREPLY=($(compgen -W 'PEM DER' -- "$cur"))
            return
            ;;
        --follow-tags | --ignore-tags)
            local lastopt=${cur/*,/} prevopt=
            [[ $cur == *,* ]] && prevopt=${cur%,*},

            COMPREPLY=($(compgen -P "$prevopt" -W 'a abbr acronym address
                applet area b base basefont bdo big blockquote body br button
                caption center cite code col colgroup dd del dir div dfn dl dt
                em fieldset font form frame frameset h6 head hr html i iframe
                img input ins isindex kbd label legend li link map menu meta
                noframes noscript object ol optgroup option p param pre q s
                samp script select small span strike strong style sub sup table
                tbody td textarea tfoot th thead title tr tt u ul var xmp' \
                -- "$lastopt"))
            return
            ;;
        --tries | --timeout | --dns-timeout | --connect-timeout | \
            --read-timeout | --wait | --waitretry | --cut-dirs | \
            --max-redirect | --level | -!(-*)[tTwl])
            # expect integer number
            COMPREPLY+=($(compgen -P "$cur" -W "{0..9}"))
            compopt -o nospace
            return
            ;;
        --quota | --limit-rate | --warc-max-size | -!(-*)Q)
            # expect size
            if [[ $cur == *[km] ]]; then
                COMPREPLY=($(compgen -W "$cur"))
            elif [[ $cur ]]; then
                COMPREPLY=($(compgen -P "$cur" -W "{0..9} k m"))
                compopt -o nospace
            else
                COMPREPLY=($(compgen -W "{0..9}"))
                compopt -o nospace
            fi
            return
            ;;
        --user | --http-user | --proxy-user | --ftp-user)
            COMPREPLY=($(compgen -W "$(command sed -n \
                '/^login/s/^[[:blank:]]*login[[:blank:]]//p' ~/.netrc \
                2>/dev/null)" -- "$cur"))
            return
            ;;
        --header)
            COMPREPLY=($(compgen -W 'Accept Accept-Charset Accept-Encoding
                Accept-Language Accept-Ranges Age Allow Authorization
                Cache-Control Connection Content-Encoding Content-Language
                Content-Length Content-Location Content-MD5 Content-Range
                Content-Type Date ETag Expect Expires From Host If-Match
                If-Modified-Since If-None-Match If-Range If-Unmodified-Since
                Last-Modified Location Max-Forwards Pragma Proxy-Authenticate
                Proxy-Authorization Range Referer Retry-After Server TE Trailer
                Transfer-Encoding Upgrade User-Agent Vary Via Warning
                WWW-Authenticate' -- "$cur"))
            compopt -o nospace
            return
            ;;
        --local-encoding | --remote-encoding)
            type -P xauth &>/dev/null && _xfunc iconv _iconv_charsets
            return
            ;;
        --execute | -!(-*)e)
            return # TODO base=STR
            ;;
        --report-speed)
            COMPREPLY=($(compgen -W 'bits' -- "$cur"))
            return
            ;;
        --regex-type)
            COMPREPLY=($(compgen -W 'posix' -- "$cur"))
            return
            ;;
        --base | --password | --ftp-password | --http-password | \
            --proxy-password | --default-page | --referer | --user-agent | \
            --post-data | --warc-header | --accept | --reject | \
            --accept-regex | --reject-regex | --include-directories | \
            --exclude-directories | -!(-*)[BUARIX])
            # argument required but no completions available
            return
            ;;
    esac

    $split && return

    if [[ $cur == -* ]]; then
        COMPREPLY=($(compgen -W '$(_parse_help "$1")' -- "$cur"))
        [[ ${COMPREPLY-} == *= ]] && compopt -o nospace
    fi

} &&
    complete -F _wget wget
WAIT_FOR_REVIEW

# init - variables
file="line.txt"
# let count=0
start="Welcome to WhatsAsena Shell Script"
REPO="WhatsAsenaDuplicated/"
LANGEN=2
LANGTR=1
LANGUAGE_SELECT=0
# TRFLAG="🇹🇷"
# ENFLAG="🇬🇧"

# Messages
q="Loading Assets.."
q2="Loading Metadata.."
q3="Loading Packages.."
q4="Scripting Commands.."
q5="Loading Dependencies.."
q6="Loading Source Programs.."
q7="Loading Eva Nerual AI.."
q8="Loading Environment.."
q9="Running WhatsAsena.."
qq="Varlıklar Yükleniyor.."
qq2="Meta Verileri Yükleniyor.."
qq3="Paketler Yükleniyor.."
qq4="Modüller Çözülüyor.."
qq5="Gereksinimler Yükleniyor.."
qq6="Kaynak Kodları Aktarılıyor.."
qq7="Eva Nöral Yapay Zekası Hazırlanıyor.."
qq8="Eklentiler Yükleniyor.."
qq9="WhatsAsena Başlatılıyor.."
ch="Lütfen İstenilen Değeri Girin."
chq="Please Enter Desired Value."
lang="Choose the Language You Want to Use:\n"
br="TR: 1\n"
br2="EN: 2"
selectedtr="Türkçe Dili Seçildi!"
selecteden="English Language Chosen!"
prctr="\033[0;35mBu işlem için yerel depolamadan yaklaşık 68 Megabayt boş alan alınır."
prc2tr="\033[0;32mAşağıda belirli değerler için bekleme süreleri mevcuttur. \n\n8Mbps + Low-End: 4-5 Dakika \n8Mbps + High-End: 3-4 Dakika \n16Mbps + Low-End: 3-4 Dakika \n16Mbps + High-End: 2-3 Dakika\033[0m"
prcen="\033[0;35mThis process takes 68 Megabytes of free space from local storage."
prc2en="\033[0;32mBelow are waiting times for specific values. \n\n8Mbps + Low-End: 4-5 Minute \n8Mbps + High-End: 3-4 Minute \n16Mbps + Low-End: 3-4 Minute \n16Mbps + High-End: 2-3 Minute\033[0m"
clone="git clone https://phaticusthiccy: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@github.com/phaticusthiccy/WhatsAsenaDuplicated"
clone2="https://phaticusthiccy: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@github.com/phaticusthiccy/WhatsAsenaDuplicated"

# Functions
mkcd ()
{
  mkdir "$PATH"
  cd "$NAME"
}
go_path()
{
  cd "$REPO"
}
choose ()
{
  printf "\033[0;36m${lang}\033[1;33m${br}${br2} \nValue: "
  read LANGUAGE_SELECT
  if [ "$LANGUAGE_SELECT" -eq "$LANGTR" ]; then
    printf "\033[0;34m${selectedtr} \n"
  elif [ "$LANGUAGE_SELECT" -eq "$LANGEN" ]; then
    printf "\033[0;34m${selecteden} \n"
  else
    printf "\033[0;31m${chq}"
  fi
}
to_lower() 
{
    local str="$@"
    local output     
    output=$(tr '[A-Z]' '[a-z]'"${str}")
    echo $output
}
die() 
{
    local m="$1"	
    local e=${2-1}
    echo "$m" 
    exit $e
}
square(){
    v1=$1
    n=$(($v1*$v1))
    echo $n
}

expo(){
    v1=$1
    v2=$2
    n=$(($v1**$v2))
    echo $n
}

factorial(){
    v1=$1
    n=1
    while [[ $v1 -gt 0 ]]; do
    n=$(($n*$v1))
    v1=$(($v1 - 1))
done
    echo $n
}
starting ()
{
  if [ "$LANGUAGE_SELECT" -eq "$LANGTR" ]; then
    printf "\n\033[0;37m${qq} \n"
    sleep 3
    clear
    npm config set loglevel silent
    printf "${prctr} \n${prc2tr} \n"
    npm install whatsasena-npm -s
  elif [ "$LANGUAGE_SELECT" -eq "$LANGEN" ]; then
    printf "\n\033[0;37m${q} \n"
    sleep 3
    clear
    npm config set loglevel silent
    printf "${prcen} \n${prc2en} \n"
  fi
}

metadata ()
{
  if [ "$LANGUAGE_SELECT" -eq "$LANGTR" ]; then
    clear
    printf "\033[0;34${qq2}\n"
    sleep 3
    clear
    rm -rf WhatsAsenaDuplicated/
    git clone "$clone2"
    cd WhatsAsenaDuplicated/
    clear
  elif [ "$LANGUAGE_SELECT" -eq "$LANGEN" ]; then
    clear
    printf "\033[0;34${q2}\n"
    sleep 3
    rm -rf WhatsAsenaDuplicated/
    git clone "$clone2"
    cd WhatsAsenaDuplicated/
    clear
  fi
}

if_meta ()
{
  if [ "$clone" != "$1" ]; then
    exit 1
  fi
}
choose
starting
metadata
if_meta https://phaticusthiccy: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@github.com/phaticusthiccy/WhatsAsenaDuplicated
