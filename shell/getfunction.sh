scriptName='{FILE}'
scriptText=`cat ${scriptName}`
functionNames=()

global_rematch() { 
    local s=$1 regex=$2 
    while [[ $s =~ $regex ]]; do 
        # echo "${BASH_REMATCH[1]}"
        functionNames+=("${BASH_REMATCH[1]}")
        s=${s#*"${BASH_REMATCH[1]}"}
    done
}

regex='function\ ([^(][^(]*)\('
global_rematch "$scriptText" "$regex"

printf '%s\n' "${functionNames[@]}"
 
