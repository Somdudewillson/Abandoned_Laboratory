
local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file)
    if ____moduleCache[file] then
        return ____moduleCache[file]
    end
    if ____modules[file] then
        ____moduleCache[file] = ____modules[file]()
        return ____moduleCache[file]
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["lualib_bundle"] = function() function __TS__ArrayIsArray(value)
    return (type(value) == "table") and ((value[1] ~= nil) or (next(value, nil) == nil))
end

function __TS__ArrayConcat(arr1, ...)
    local args = {...}
    local out = {}
    for ____, val in ipairs(arr1) do
        out[#out + 1] = val
    end
    for ____, arg in ipairs(args) do
        if __TS__ArrayIsArray(arg) then
            local argAsArray = arg
            for ____, val in ipairs(argAsArray) do
                out[#out + 1] = val
            end
        else
            out[#out + 1] = arg
        end
    end
    return out
end

function __TS__ArrayEvery(arr, callbackfn)
    do
        local i = 0
        while i < #arr do
            if not callbackfn(_G, arr[i + 1], i, arr) then
                return false
            end
            i = i + 1
        end
    end
    return true
end

function __TS__ArrayFilter(arr, callbackfn)
    local result = {}
    do
        local i = 0
        while i < #arr do
            if callbackfn(_G, arr[i + 1], i, arr) then
                result[#result + 1] = arr[i + 1]
            end
            i = i + 1
        end
    end
    return result
end

function __TS__ArrayForEach(arr, callbackFn)
    do
        local i = 0
        while i < #arr do
            callbackFn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
end

function __TS__ArrayFind(arr, predicate)
    local len = #arr
    local k = 0
    while k < len do
        local elem = arr[k + 1]
        if predicate(_G, elem, k, arr) then
            return elem
        end
        k = k + 1
    end
    return nil
end

function __TS__ArrayFindIndex(arr, callbackFn)
    do
        local i = 0
        local len = #arr
        while i < len do
            if callbackFn(_G, arr[i + 1], i, arr) then
                return i
            end
            i = i + 1
        end
    end
    return -1
end

function __TS__ArrayIncludes(self, searchElement, fromIndex)
    if fromIndex == nil then
        fromIndex = 0
    end
    local len = #self
    local k = fromIndex
    if fromIndex < 0 then
        k = len + fromIndex
    end
    if k < 0 then
        k = 0
    end
    for i = k, len do
        if self[i + 1] == searchElement then
            return true
        end
    end
    return false
end

function __TS__ArrayIndexOf(arr, searchElement, fromIndex)
    local len = #arr
    if len == 0 then
        return -1
    end
    local n = 0
    if fromIndex then
        n = fromIndex
    end
    if n >= len then
        return -1
    end
    local k
    if n >= 0 then
        k = n
    else
        k = len + n
        if k < 0 then
            k = 0
        end
    end
    do
        local i = k
        while i < len do
            if arr[i + 1] == searchElement then
                return i
            end
            i = i + 1
        end
    end
    return -1
end

function __TS__ArrayJoin(self, separator)
    if separator == nil then
        separator = ","
    end
    local result = ""
    for index, value in ipairs(self) do
        if index > 1 then
            result = tostring(result) .. tostring(separator)
        end
        result = tostring(result) .. tostring(
            tostring(value)
        )
    end
    return result
end

function __TS__ArrayMap(arr, callbackfn)
    local newArray = {}
    do
        local i = 0
        while i < #arr do
            newArray[i + 1] = callbackfn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
    return newArray
end

function __TS__ArrayPush(arr, ...)
    local items = {...}
    for ____, item in ipairs(items) do
        arr[#arr + 1] = item
    end
    return #arr
end

function __TS__ArrayReduce(arr, callbackFn, ...)
    local len = #arr
    local k = 0
    local accumulator = nil
    if select("#", ...) ~= 0 then
        accumulator = select(1, ...)
    elseif len > 0 then
        accumulator = arr[1]
        k = 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k, len - 1 do
        accumulator = callbackFn(_G, accumulator, arr[i + 1], i, arr)
    end
    return accumulator
end

function __TS__ArrayReduceRight(arr, callbackFn, ...)
    local len = #arr
    local k = len - 1
    local accumulator = nil
    if select("#", ...) ~= 0 then
        accumulator = select(1, ...)
    elseif len > 0 then
        accumulator = arr[k + 1]
        k = k - 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k, 0, -1 do
        accumulator = callbackFn(_G, accumulator, arr[i + 1], i, arr)
    end
    return accumulator
end

function __TS__ArrayReverse(arr)
    local i = 0
    local j = #arr - 1
    while i < j do
        local temp = arr[j + 1]
        arr[j + 1] = arr[i + 1]
        arr[i + 1] = temp
        i = i + 1
        j = j - 1
    end
    return arr
end

function __TS__ArrayShift(arr)
    return table.remove(arr, 1)
end

function __TS__ArrayUnshift(arr, ...)
    local items = {...}
    do
        local i = #items - 1
        while i >= 0 do
            table.insert(arr, 1, items[i + 1])
            i = i - 1
        end
    end
    return #arr
end

function __TS__ArraySort(arr, compareFn)
    if compareFn ~= nil then
        table.sort(
            arr,
            function(a, b) return compareFn(_G, a, b) < 0 end
        )
    else
        table.sort(arr)
    end
    return arr
end

function __TS__ArraySlice(list, first, last)
    local len = #list
    local relativeStart = first or 0
    local k
    if relativeStart < 0 then
        k = math.max(len + relativeStart, 0)
    else
        k = math.min(relativeStart, len)
    end
    local relativeEnd = last
    if last == nil then
        relativeEnd = len
    end
    local final
    if relativeEnd < 0 then
        final = math.max(len + relativeEnd, 0)
    else
        final = math.min(relativeEnd, len)
    end
    local out = {}
    local n = 0
    while k < final do
        out[n + 1] = list[k + 1]
        k = k + 1
        n = n + 1
    end
    return out
end

function __TS__ArraySome(arr, callbackfn)
    do
        local i = 0
        while i < #arr do
            if callbackfn(_G, arr[i + 1], i, arr) then
                return true
            end
            i = i + 1
        end
    end
    return false
end

function __TS__ArraySplice(list, ...)
    local len = #list
    local actualArgumentCount = select("#", ...)
    local start = select(1, ...)
    local deleteCount = select(2, ...)
    local actualStart
    if start < 0 then
        actualStart = math.max(len + start, 0)
    else
        actualStart = math.min(start, len)
    end
    local itemCount = math.max(actualArgumentCount - 2, 0)
    local actualDeleteCount
    if actualArgumentCount == 0 then
        actualDeleteCount = 0
    elseif actualArgumentCount == 1 then
        actualDeleteCount = len - actualStart
    else
        actualDeleteCount = math.min(
            math.max(deleteCount or 0, 0),
            len - actualStart
        )
    end
    local out = {}
    do
        local k = 0
        while k < actualDeleteCount do
            local from = actualStart + k
            if list[from + 1] then
                out[k + 1] = list[from + 1]
            end
            k = k + 1
        end
    end
    if itemCount < actualDeleteCount then
        do
            local k = actualStart
            while k < (len - actualDeleteCount) do
                local from = k + actualDeleteCount
                local to = k + itemCount
                if list[from + 1] then
                    list[to + 1] = list[from + 1]
                else
                    list[to + 1] = nil
                end
                k = k + 1
            end
        end
        do
            local k = len
            while k > ((len - actualDeleteCount) + itemCount) do
                list[k] = nil
                k = k - 1
            end
        end
    elseif itemCount > actualDeleteCount then
        do
            local k = len - actualDeleteCount
            while k > actualStart do
                local from = (k + actualDeleteCount) - 1
                local to = (k + itemCount) - 1
                if list[from + 1] then
                    list[to + 1] = list[from + 1]
                else
                    list[to + 1] = nil
                end
                k = k - 1
            end
        end
    end
    local j = actualStart
    for i = 3, actualArgumentCount do
        list[j + 1] = select(i, ...)
        j = j + 1
    end
    do
        local k = #list - 1
        while k >= ((len - actualDeleteCount) + itemCount) do
            list[k + 1] = nil
            k = k - 1
        end
    end
    return out
end

function __TS__ArrayToObject(array)
    local object = {}
    do
        local i = 0
        while i < #array do
            object[i] = array[i + 1]
            i = i + 1
        end
    end
    return object
end

function __TS__ArrayFlat(array, depth)
    if depth == nil then
        depth = 1
    end
    local result = {}
    for ____, value in ipairs(array) do
        if (depth > 0) and __TS__ArrayIsArray(value) then
            result = __TS__ArrayConcat(
                result,
                __TS__ArrayFlat(value, depth - 1)
            )
        else
            result[#result + 1] = value
        end
    end
    return result
end

function __TS__ArrayFlatMap(array, callback)
    local result = {}
    do
        local i = 0
        while i < #array do
            local value = callback(_G, array[i + 1], i, array)
            if (type(value) == "table") and __TS__ArrayIsArray(value) then
                result = __TS__ArrayConcat(result, value)
            else
                result[#result + 1] = value
            end
            i = i + 1
        end
    end
    return result
end

function __TS__ArraySetLength(arr, length)
    if (((length < 0) or (length ~= length)) or (length == math.huge)) or (math.floor(length) ~= length) then
        error(
            "invalid array length: " .. tostring(length),
            0
        )
    end
    do
        local i = #arr - 1
        while i >= length do
            arr[i + 1] = nil
            i = i - 1
        end
    end
    return length
end

function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

function __TS__ClassExtends(target, base)
    target.____super = base
    local staticMetatable = setmetatable({__index = base}, base)
    setmetatable(target, staticMetatable)
    local baseMetatable = getmetatable(base)
    if baseMetatable then
        if type(baseMetatable.__index) == "function" then
            staticMetatable.__index = baseMetatable.__index
        end
        if type(baseMetatable.__newindex) == "function" then
            staticMetatable.__newindex = baseMetatable.__newindex
        end
    end
    setmetatable(target.prototype, base.prototype)
    if type(base.prototype.__index) == "function" then
        target.prototype.__index = base.prototype.__index
    end
    if type(base.prototype.__newindex) == "function" then
        target.prototype.__newindex = base.prototype.__newindex
    end
    if type(base.prototype.__tostring) == "function" then
        target.prototype.__tostring = base.prototype.__tostring
    end
end

function __TS__CloneDescriptor(____bindingPattern0)
    local enumerable
    enumerable = ____bindingPattern0.enumerable
    local configurable
    configurable = ____bindingPattern0.configurable
    local get
    get = ____bindingPattern0.get
    local set
    set = ____bindingPattern0.set
    local writable
    writable = ____bindingPattern0.writable
    local value
    value = ____bindingPattern0.value
    local descriptor = {enumerable = enumerable == true, configurable = configurable == true}
    local hasGetterOrSetter = (get ~= nil) or (set ~= nil)
    local hasValueOrWritableAttribute = (writable ~= nil) or (value ~= nil)
    if hasGetterOrSetter and hasValueOrWritableAttribute then
        error("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute.", 0)
    end
    if get or set then
        descriptor.get = get
        descriptor.set = set
    else
        descriptor.value = value
        descriptor.writable = writable == true
    end
    return descriptor
end

function __TS__Decorate(decorators, target, key, desc)
    local result = target
    do
        local i = #decorators
        while i >= 0 do
            local decorator = decorators[i + 1]
            if decorator then
                local oldResult = result
                if key == nil then
                    result = decorator(_G, result)
                elseif desc == true then
                    local value = rawget(target, key)
                    local descriptor = __TS__ObjectGetOwnPropertyDescriptor(target, key) or ({configurable = true, writable = true, value = value})
                    local desc = decorator(_G, target, key, descriptor) or descriptor
                    local isSimpleValue = (((desc.configurable == true) and (desc.writable == true)) and (not desc.get)) and (not desc.set)
                    if isSimpleValue then
                        rawset(target, key, desc.value)
                    else
                        __TS__SetDescriptor(
                            target,
                            key,
                            __TS__ObjectAssign({}, descriptor, desc)
                        )
                    end
                elseif desc == false then
                    result = decorator(_G, target, key, desc)
                else
                    result = decorator(_G, target, key)
                end
                result = result or oldResult
            end
            i = i - 1
        end
    end
    return result
end

function __TS__DecorateParam(paramIndex, decorator)
    return function(____, target, key) return decorator(_G, target, key, paramIndex) end
end

function __TS__ObjectGetOwnPropertyDescriptors(object)
    local metatable = getmetatable(object)
    if not metatable then
        return {}
    end
    return rawget(metatable, "_descriptors") or ({})
end

function __TS__Delete(target, key)
    local descriptors = __TS__ObjectGetOwnPropertyDescriptors(target)
    local descriptor = descriptors[key]
    if descriptor then
        if not descriptor.configurable then
            error(
                ((("Cannot delete property " .. tostring(key)) .. " of ") .. tostring(target)) .. ".",
                0
            )
        end
        descriptors[key] = nil
        return true
    end
    if target[key] ~= nil then
        target[key] = nil
        return true
    end
    return false
end

function __TS__DelegatedYield(iterable)
    if type(iterable) == "string" then
        for index = 0, #iterable - 1 do
            coroutine.yield(
                __TS__StringAccess(iterable, index)
            )
        end
    elseif iterable.____coroutine ~= nil then
        local co = iterable.____coroutine
        while true do
            local status, value = coroutine.resume(co)
            if not status then
                error(value, 0)
            end
            if coroutine.status(co) == "dead" then
                return value
            else
                coroutine.yield(value)
            end
        end
    elseif iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                return result.value
            else
                coroutine.yield(result.value)
            end
        end
    else
        for ____, value in ipairs(iterable) do
            coroutine.yield(value)
        end
    end
end

function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end

function __TS__GetErrorStack(self, constructor)
    local level = 1
    while true do
        local info = debug.getinfo(level, "f")
        level = level + 1
        if not info then
            level = 1
            break
        elseif info.func == constructor then
            break
        end
    end
    return debug.traceback(nil, level)
end
function __TS__WrapErrorToString(self, getDescription)
    return function(self)
        local description = getDescription(self)
        local caller = debug.getinfo(3, "f")
        if (_VERSION == "Lua 5.1") or (caller and (caller.func ~= error)) then
            return description
        else
            return (tostring(description) .. "\n") .. self.stack
        end
    end
end
function __TS__InitErrorClass(self, Type, name)
    Type.name = name
    return setmetatable(
        Type,
        {
            __call = function(____, _self, message) return __TS__New(Type, message) end
        }
    )
end
Error = __TS__InitErrorClass(
    _G,
    (function()
        local ____ = __TS__Class()
        ____.name = ""
        function ____.prototype.____constructor(self, message)
            if message == nil then
                message = ""
            end
            self.message = message
            self.name = "Error"
            self.stack = __TS__GetErrorStack(_G, self.constructor.new)
            local metatable = getmetatable(self)
            if not metatable.__errorToStringPatched then
                metatable.__errorToStringPatched = true
                metatable.__tostring = __TS__WrapErrorToString(_G, metatable.__tostring)
            end
        end
        function ____.prototype.__tostring(self)
            return (((self.message ~= "") and (function() return (self.name .. ": ") .. self.message end)) or (function() return self.name end))()
        end
        return ____
    end)(),
    "Error"
)
for ____, errorName in ipairs({"RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"}) do
    _G[errorName] = __TS__InitErrorClass(
        _G,
        (function()
            local ____ = __TS__Class()
            ____.name = ____.name
            __TS__ClassExtends(____, Error)
            function ____.prototype.____constructor(self, ...)
                Error.prototype.____constructor(self, ...)
                self.name = errorName
            end
            return ____
        end)(),
        errorName
    )
end

__TS__Unpack = table.unpack or unpack

function __TS__FunctionBind(fn, thisArg, ...)
    local boundArgs = {...}
    return function(____, ...)
        local args = {...}
        do
            local i = 0
            while i < #boundArgs do
                table.insert(args, i + 1, boundArgs[i + 1])
                i = i + 1
            end
        end
        return fn(
            thisArg,
            __TS__Unpack(args)
        )
    end
end

____symbolMetatable = {
    __tostring = function(self)
        return ("Symbol(" .. (self.description or "")) .. ")"
    end
}
function __TS__Symbol(description)
    return setmetatable({description = description}, ____symbolMetatable)
end
Symbol = {
    iterator = __TS__Symbol("Symbol.iterator"),
    hasInstance = __TS__Symbol("Symbol.hasInstance"),
    species = __TS__Symbol("Symbol.species"),
    toStringTag = __TS__Symbol("Symbol.toStringTag")
}

function __TS__GeneratorIterator(self)
    return self
end
function __TS__GeneratorNext(self, ...)
    local co = self.____coroutine
    if coroutine.status(co) == "dead" then
        return {done = true}
    end
    local status, value = coroutine.resume(co, ...)
    if not status then
        error(value, 0)
    end
    return {
        value = value,
        done = coroutine.status(co) == "dead"
    }
end
function __TS__Generator(fn)
    return function(...)
        local args = {...}
        local argsLength = select("#", ...)
        return {
            ____coroutine = coroutine.create(
                function() return fn(
                    (unpack or table.unpack)(args, 1, argsLength)
                ) end
            ),
            [Symbol.iterator] = __TS__GeneratorIterator,
            next = __TS__GeneratorNext
        }
    end
end

function __TS__InstanceOf(obj, classTbl)
    if type(classTbl) ~= "table" then
        error("Right-hand side of 'instanceof' is not an object", 0)
    end
    if classTbl[Symbol.hasInstance] ~= nil then
        return not (not classTbl[Symbol.hasInstance](classTbl, obj))
    end
    if type(obj) == "table" then
        local luaClass = obj.constructor
        while luaClass ~= nil do
            if luaClass == classTbl then
                return true
            end
            luaClass = luaClass.____super
        end
    end
    return false
end

function __TS__InstanceOfObject(value)
    local valueType = type(value)
    return (valueType == "table") or (valueType == "function")
end

function __TS__IteratorGeneratorStep(self)
    local co = self.____coroutine
    local status, value = coroutine.resume(co)
    if not status then
        error(value, 0)
    end
    if coroutine.status(co) == "dead" then
        return
    end
    return true, value
end
function __TS__IteratorIteratorStep(self)
    local result = self:next()
    if result.done then
        return
    end
    return true, result.value
end
function __TS__IteratorStringStep(self, index)
    index = index + 1
    if index > #self then
        return
    end
    return index, string.sub(self, index, index)
end
function __TS__Iterator(iterable)
    if type(iterable) == "string" then
        return __TS__IteratorStringStep, iterable, 0
    elseif iterable.____coroutine ~= nil then
        return __TS__IteratorGeneratorStep, iterable
    elseif iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        return __TS__IteratorIteratorStep, iterator
    else
        return __TS__Unpack(
            {
                ipairs(iterable)
            }
        )
    end
end

Map = (function()
    local Map = __TS__Class()
    Map.name = "Map"
    function Map.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "Map"
        self.items = {}
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self:set(value[1], value[2])
            end
        else
            local array = entries
            for ____, kvp in ipairs(array) do
                self:set(kvp[1], kvp[2])
            end
        end
    end
    function Map.prototype.clear(self)
        self.items = {}
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Map.prototype.delete(self, key)
        local contains = self:has(key)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[key]
            local previous = self.previousKey[key]
            if next and previous then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[key] = nil
            self.previousKey[key] = nil
        end
        self.items[key] = nil
        return contains
    end
    function Map.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(
            self:keys()
        ) do
            callback(_G, self.items[key], key, self)
        end
    end
    function Map.prototype.get(self, key)
        return self.items[key]
    end
    function Map.prototype.has(self, key)
        return (self.nextKey[key] ~= nil) or (self.lastKey == key)
    end
    function Map.prototype.set(self, key, value)
        local isNewValue = not self:has(key)
        if isNewValue then
            self.size = self.size + 1
        end
        self.items[key] = value
        if self.firstKey == nil then
            self.firstKey = key
            self.lastKey = key
        elseif isNewValue then
            self.nextKey[self.lastKey] = key
            self.previousKey[key] = self.lastKey
            self.lastKey = key
        end
        return self
    end
    Map.prototype[Symbol.iterator] = function(self)
        return self:entries()
    end
    function Map.prototype.entries(self)
        local ____ = self
        local items = ____.items
        local nextKey = ____.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, items[key]}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.values(self)
        local ____ = self
        local items = ____.items
        local nextKey = ____.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = items[key]}
                key = nextKey[key]
                return result
            end
        }
    end
    Map[Symbol.species] = Map
    return Map
end)()

__TS__MathAtan2 = math.atan2 or math.atan

function __TS__Number(value)
    local valueType = type(value)
    if valueType == "number" then
        return value
    elseif valueType == "string" then
        local numberValue = tonumber(value)
        if numberValue then
            return numberValue
        end
        if value == "Infinity" then
            return math.huge
        end
        if value == "-Infinity" then
            return -math.huge
        end
        local stringWithoutSpaces = string.gsub(value, "%s", "")
        if stringWithoutSpaces == "" then
            return 0
        end
        return 0 / 0
    elseif valueType == "boolean" then
        return (value and 1) or 0
    else
        return 0 / 0
    end
end

function __TS__NumberIsFinite(value)
    return (((type(value) == "number") and (value == value)) and (value ~= math.huge)) and (value ~= -math.huge)
end

function __TS__NumberIsNaN(value)
    return value ~= value
end

____radixChars = "0123456789abcdefghijklmnopqrstuvwxyz"
function __TS__NumberToString(self, radix)
    if ((((radix == nil) or (radix == 10)) or (self == math.huge)) or (self == -math.huge)) or (self ~= self) then
        return tostring(self)
    end
    radix = math.floor(radix)
    if (radix < 2) or (radix > 36) then
        error("toString() radix argument must be between 2 and 36", 0)
    end
    local integer, fraction = math.modf(
        math.abs(self)
    )
    local result = ""
    if radix == 8 then
        result = string.format("%o", integer)
    elseif radix == 16 then
        result = string.format("%x", integer)
    else
        repeat
            do
                result = tostring(
                    __TS__StringAccess(____radixChars, integer % radix)
                ) .. tostring(result)
                integer = math.floor(integer / radix)
            end
        until not (integer ~= 0)
    end
    if fraction ~= 0 then
        result = tostring(result) .. "."
        local delta = 1e-16
        repeat
            do
                fraction = fraction * radix
                delta = delta * radix
                local digit = math.floor(fraction)
                result = tostring(result) .. tostring(
                    __TS__StringAccess(____radixChars, digit)
                )
                fraction = fraction - digit
            end
        until not (fraction >= delta)
    end
    if self < 0 then
        result = "-" .. tostring(result)
    end
    return result
end

function __TS__ObjectAssign(to, ...)
    local sources = {...}
    if to == nil then
        return to
    end
    for ____, source in ipairs(sources) do
        for key in pairs(source) do
            to[key] = source[key]
        end
    end
    return to
end

function ____descriptorIndex(self, key)
    local value = rawget(self, key)
    if value ~= nil then
        return value
    end
    local metatable = getmetatable(self)
    while metatable do
        local rawResult = rawget(metatable, key)
        if rawResult ~= nil then
            return rawResult
        end
        local descriptors = rawget(metatable, "_descriptors")
        if descriptors then
            local descriptor = descriptors[key]
            if descriptor then
                if descriptor.get then
                    return descriptor.get(self)
                end
                return descriptor.value
            end
        end
        metatable = getmetatable(metatable)
    end
end
function ____descriptorNewindex(self, key, value)
    local metatable = getmetatable(self)
    while metatable do
        local descriptors = rawget(metatable, "_descriptors")
        if descriptors then
            local descriptor = descriptors[key]
            if descriptor then
                if descriptor.set then
                    descriptor.set(self, value)
                else
                    if descriptor.writable == false then
                        error(
                            ((("Cannot assign to read only property '" .. key) .. "' of object '") .. tostring(self)) .. "'",
                            0
                        )
                    end
                    descriptor.value = value
                end
                return
            end
        end
        metatable = getmetatable(metatable)
    end
    rawset(self, key, value)
end
function __TS__SetDescriptor(target, key, desc, isPrototype)
    if isPrototype == nil then
        isPrototype = false
    end
    local metatable = ((isPrototype and (function() return target end)) or (function() return getmetatable(target) end))()
    if not metatable then
        metatable = {}
        setmetatable(target, metatable)
    end
    local value = rawget(target, key)
    if value ~= nil then
        rawset(target, key, nil)
    end
    if not rawget(metatable, "_descriptors") then
        metatable._descriptors = {}
    end
    local descriptor = __TS__CloneDescriptor(desc)
    metatable._descriptors[key] = descriptor
    metatable.__index = ____descriptorIndex
    metatable.__newindex = ____descriptorNewindex
end

function __TS__ObjectDefineProperty(target, key, desc)
    local luaKey = (((type(key) == "number") and (function() return key + 1 end)) or (function() return key end))()
    local value = rawget(target, luaKey)
    local hasGetterOrSetter = (desc.get ~= nil) or (desc.set ~= nil)
    local descriptor
    if hasGetterOrSetter then
        if value ~= nil then
            error(
                "Cannot redefine property: " .. tostring(key),
                0
            )
        end
        descriptor = desc
    else
        local valueExists = value ~= nil
        descriptor = {
            set = desc.set,
            get = desc.get,
            configurable = (((desc.configurable ~= nil) and (function() return desc.configurable end)) or (function() return valueExists end))(),
            enumerable = (((desc.enumerable ~= nil) and (function() return desc.enumerable end)) or (function() return valueExists end))(),
            writable = (((desc.writable ~= nil) and (function() return desc.writable end)) or (function() return valueExists end))(),
            value = (((desc.value ~= nil) and (function() return desc.value end)) or (function() return value end))()
        }
    end
    __TS__SetDescriptor(target, luaKey, descriptor)
    return target
end

function __TS__ObjectEntries(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = {key, obj[key]}
    end
    return result
end

function __TS__ObjectFromEntries(entries)
    local obj = {}
    local iterable = entries
    if iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                break
            end
            local value = result.value
            obj[value[1]] = value[2]
        end
    else
        for ____, entry in ipairs(entries) do
            obj[entry[1]] = entry[2]
        end
    end
    return obj
end

function __TS__ObjectGetOwnPropertyDescriptor(object, key)
    local metatable = getmetatable(object)
    if not metatable then
        return
    end
    if not rawget(metatable, "_descriptors") then
        return
    end
    return rawget(metatable, "_descriptors")[key]
end

function __TS__ObjectKeys(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = key
    end
    return result
end

function __TS__ObjectRest(target, usedProperties)
    local result = {}
    for property in pairs(target) do
        if not usedProperties[property] then
            result[property] = target[property]
        end
    end
    return result
end

function __TS__ObjectValues(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = obj[key]
    end
    return result
end

function __TS__ParseFloat(numberString)
    local infinityMatch = string.match(numberString, "^%s*(-?Infinity)")
    if infinityMatch then
        return (((__TS__StringAccess(infinityMatch, 0) == "-") and (function() return -math.huge end)) or (function() return math.huge end))()
    end
    local number = tonumber(
        string.match(numberString, "^%s*(-?%d+%.?%d*)")
    )
    return number or (0 / 0)
end

__TS__parseInt_base_pattern = "0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTvVwWxXyYzZ"
function __TS__ParseInt(numberString, base)
    if base == nil then
        base = 10
        local hexMatch = string.match(numberString, "^%s*-?0[xX]")
        if hexMatch then
            base = 16
            numberString = ((string.match(hexMatch, "-") and (function() return "-" .. tostring(
                __TS__StringSubstr(numberString, #hexMatch)
            ) end)) or (function() return __TS__StringSubstr(numberString, #hexMatch) end))()
        end
    end
    if (base < 2) or (base > 36) then
        return 0 / 0
    end
    local allowedDigits = (((base <= 10) and (function() return __TS__StringSubstring(__TS__parseInt_base_pattern, 0, base) end)) or (function() return __TS__StringSubstr(__TS__parseInt_base_pattern, 0, 10 + (2 * (base - 10))) end))()
    local pattern = ("^%s*(-?[" .. allowedDigits) .. "]*)"
    local number = tonumber(
        string.match(numberString, pattern),
        base
    )
    if number == nil then
        return 0 / 0
    end
    if number >= 0 then
        return math.floor(number)
    else
        return math.ceil(number)
    end
end

Set = (function()
    local Set = __TS__Class()
    Set.name = "Set"
    function Set.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "Set"
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self:add(result.value)
            end
        else
            local array = values
            for ____, value in ipairs(array) do
                self:add(value)
            end
        end
    end
    function Set.prototype.add(self, value)
        local isNewValue = not self:has(value)
        if isNewValue then
            self.size = self.size + 1
        end
        if self.firstKey == nil then
            self.firstKey = value
            self.lastKey = value
        elseif isNewValue then
            self.nextKey[self.lastKey] = value
            self.previousKey[value] = self.lastKey
            self.lastKey = value
        end
        return self
    end
    function Set.prototype.clear(self)
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Set.prototype.delete(self, value)
        local contains = self:has(value)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[value]
            local previous = self.previousKey[value]
            if next and previous then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[value] = nil
            self.previousKey[value] = nil
        end
        return contains
    end
    function Set.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(
            self:keys()
        ) do
            callback(_G, key, key, self)
        end
    end
    function Set.prototype.has(self, value)
        return (self.nextKey[value] ~= nil) or (self.lastKey == value)
    end
    Set.prototype[Symbol.iterator] = function(self)
        return self:values()
    end
    function Set.prototype.entries(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, key}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.values(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    Set[Symbol.species] = Set
    return Set
end)()

WeakMap = (function()
    local WeakMap = __TS__Class()
    WeakMap.name = "WeakMap"
    function WeakMap.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "WeakMap"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self.items[value[1]] = value[2]
            end
        else
            for ____, kvp in ipairs(entries) do
                self.items[kvp[1]] = kvp[2]
            end
        end
    end
    function WeakMap.prototype.delete(self, key)
        local contains = self:has(key)
        self.items[key] = nil
        return contains
    end
    function WeakMap.prototype.get(self, key)
        return self.items[key]
    end
    function WeakMap.prototype.has(self, key)
        return self.items[key] ~= nil
    end
    function WeakMap.prototype.set(self, key, value)
        self.items[key] = value
        return self
    end
    WeakMap[Symbol.species] = WeakMap
    return WeakMap
end)()

WeakSet = (function()
    local WeakSet = __TS__Class()
    WeakSet.name = "WeakSet"
    function WeakSet.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "WeakSet"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self.items[result.value] = true
            end
        else
            for ____, value in ipairs(values) do
                self.items[value] = true
            end
        end
    end
    function WeakSet.prototype.add(self, value)
        self.items[value] = true
        return self
    end
    function WeakSet.prototype.delete(self, value)
        local contains = self:has(value)
        self.items[value] = nil
        return contains
    end
    function WeakSet.prototype.has(self, value)
        return self.items[value] == true
    end
    WeakSet[Symbol.species] = WeakSet
    return WeakSet
end)()

function __TS__SourceMapTraceBack(fileName, sourceMap)
    _G.__TS__sourcemap = _G.__TS__sourcemap or ({})
    _G.__TS__sourcemap[fileName] = sourceMap
    if _G.__TS__originalTraceback == nil then
        _G.__TS__originalTraceback = debug.traceback
        debug.traceback = function(thread, message, level)
            local trace
            if ((thread == nil) and (message == nil)) and (level == nil) then
                trace = _G.__TS__originalTraceback()
            else
                trace = _G.__TS__originalTraceback(thread, message, level)
            end
            if type(trace) ~= "string" then
                return trace
            end
            local result = string.gsub(
                trace,
                "(%S+).lua:(%d+)",
                function(file, line)
                    local fileSourceMap = _G.__TS__sourcemap[tostring(file) .. ".lua"]
                    if fileSourceMap and fileSourceMap[line] then
                        return (file .. ".ts:") .. tostring(fileSourceMap[line])
                    end
                    return (file .. ".lua:") .. line
                end
            )
            return result
        end
    end
end

function __TS__Spread(iterable)
    local arr = {}
    if type(iterable) == "string" then
        do
            local i = 0
            while i < #iterable do
                arr[#arr + 1] = __TS__StringAccess(iterable, i)
                i = i + 1
            end
        end
    else
        for ____, item in __TS__Iterator(iterable) do
            arr[#arr + 1] = item
        end
    end
    return __TS__Unpack(arr)
end

function __TS__StringAccess(self, index)
    if (index >= 0) and (index < #self) then
        return string.sub(self, index + 1, index + 1)
    end
end

function __TS__StringCharAt(self, pos)
    if pos ~= pos then
        pos = 0
    end
    if pos < 0 then
        return ""
    end
    return string.sub(self, pos + 1, pos + 1)
end

function __TS__StringCharCodeAt(self, index)
    if index ~= index then
        index = 0
    end
    if index < 0 then
        return 0 / 0
    end
    return string.byte(self, index + 1) or (0 / 0)
end

function __TS__StringConcat(str1, ...)
    local args = {...}
    local out = str1
    for ____, arg in ipairs(args) do
        out = tostring(out) .. tostring(arg)
    end
    return out
end

function __TS__StringEndsWith(self, searchString, endPosition)
    if (endPosition == nil) or (endPosition > #self) then
        endPosition = #self
    end
    return string.sub(self, (endPosition - #searchString) + 1, endPosition) == searchString
end

function __TS__StringIncludes(self, searchString, position)
    if not position then
        position = 1
    else
        position = position + 1
    end
    local index = string.find(self, searchString, position, true)
    return index ~= nil
end

function __TS__StringPadEnd(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if (maxLength == -math.huge) or (maxLength == math.huge) then
        error("Invalid string length", 0)
    end
    if (#self >= maxLength) or (#fillString == 0) then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = tostring(fillString) .. tostring(
            string.rep(
                fillString,
                math.floor(maxLength / #fillString)
            )
        )
    end
    return tostring(self) .. tostring(
        string.sub(
            fillString,
            1,
            math.floor(maxLength)
        )
    )
end

function __TS__StringPadStart(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if (maxLength == -math.huge) or (maxLength == math.huge) then
        error("Invalid string length", 0)
    end
    if (#self >= maxLength) or (#fillString == 0) then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = tostring(fillString) .. tostring(
            string.rep(
                fillString,
                math.floor(maxLength / #fillString)
            )
        )
    end
    return tostring(
        string.sub(
            fillString,
            1,
            math.floor(maxLength)
        )
    ) .. tostring(self)
end

function __TS__StringReplace(source, searchValue, replaceValue)
    searchValue = string.gsub(searchValue, "[%%%(%)%.%+%-%*%?%[%^%$]", "%%%1")
    if type(replaceValue) == "string" then
        replaceValue = string.gsub(replaceValue, "%%", "%%%%")
        local result = string.gsub(source, searchValue, replaceValue, 1)
        return result
    else
        local result = string.gsub(
            source,
            searchValue,
            function(match) return replaceValue(_G, match) end,
            1
        )
        return result
    end
end

function __TS__StringSlice(self, start, ____end)
    if (start == nil) or (start ~= start) then
        start = 0
    end
    if ____end ~= ____end then
        ____end = 0
    end
    if start >= 0 then
        start = start + 1
    end
    if (____end ~= nil) and (____end < 0) then
        ____end = ____end - 1
    end
    return string.sub(self, start, ____end)
end

function __TS__StringSubstring(self, start, ____end)
    if ____end ~= ____end then
        ____end = 0
    end
    if (____end ~= nil) and (start > ____end) then
        start, ____end = __TS__Unpack({____end, start})
    end
    if start >= 0 then
        start = start + 1
    else
        start = 1
    end
    if (____end ~= nil) and (____end < 0) then
        ____end = 0
    end
    return string.sub(self, start, ____end)
end

function __TS__StringSplit(source, separator, limit)
    if limit == nil then
        limit = 4294967295
    end
    if limit == 0 then
        return {}
    end
    local out = {}
    local index = 0
    local count = 0
    if (separator == nil) or (separator == "") then
        while (index < (#source - 1)) and (count < limit) do
            out[count + 1] = __TS__StringAccess(source, index)
            count = count + 1
            index = index + 1
        end
    else
        local separatorLength = #separator
        local nextIndex = (string.find(source, separator, nil, true) or 0) - 1
        while (nextIndex >= 0) and (count < limit) do
            out[count + 1] = __TS__StringSubstring(source, index, nextIndex)
            count = count + 1
            index = nextIndex + separatorLength
            nextIndex = (string.find(
                source,
                separator,
                math.max(index + 1, 1),
                true
            ) or 0) - 1
        end
    end
    if count < limit then
        out[count + 1] = __TS__StringSubstring(source, index)
    end
    return out
end

function __TS__StringStartsWith(self, searchString, position)
    if (position == nil) or (position < 0) then
        position = 0
    end
    return string.sub(self, position + 1, #searchString + position) == searchString
end

function __TS__StringSubstr(self, from, length)
    if from ~= from then
        from = 0
    end
    if length ~= nil then
        if (length ~= length) or (length <= 0) then
            return ""
        end
        length = length + from
    end
    if from >= 0 then
        from = from + 1
    end
    return string.sub(self, from, length)
end

function __TS__StringTrim(self)
    local result = string.gsub(self, "^[%s ﻿]*(.-)[%s ﻿]*$", "%1")
    return result
end

function __TS__StringTrimEnd(self)
    local result = string.gsub(self, "[%s ﻿]*$", "")
    return result
end

function __TS__StringTrimStart(self)
    local result = string.gsub(self, "^[%s ﻿]*", "")
    return result
end

____symbolRegistry = {}
function __TS__SymbolRegistryFor(key)
    if not ____symbolRegistry[key] then
        ____symbolRegistry[key] = __TS__Symbol(key)
    end
    return ____symbolRegistry[key]
end
function __TS__SymbolRegistryKeyFor(sym)
    for key in pairs(____symbolRegistry) do
        if ____symbolRegistry[key] == sym then
            return key
        end
    end
end

function __TS__TypeOf(value)
    local luaType = type(value)
    if luaType == "table" then
        return "object"
    elseif luaType == "nil" then
        return "undefined"
    else
        return luaType
    end
end

end,
["constants"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.CollectibleTypeLab = CollectibleTypeLab or ({})
____exports.CollectibleTypeLab.COLLECTIBLE_DIGITALCARD = Isaac.GetItemIdByName("Digital Card")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_DIGITALCARD] = "COLLECTIBLE_DIGITALCARD"
____exports.CollectibleTypeLab.COLLECTIBLE_CARTOGRAPHERTOME = Isaac.GetItemIdByName("Cartographer's Tome")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_CARTOGRAPHERTOME] = "COLLECTIBLE_CARTOGRAPHERTOME"
____exports.CollectibleTypeLab.COLLECTIBLE_ANARCHISTEBOOK = Isaac.GetItemIdByName("Anarchist's E-Book")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_ANARCHISTEBOOK] = "COLLECTIBLE_ANARCHISTEBOOK"
____exports.CollectibleTypeLab.COLLECTIBLE_SHADOWDEVICE = Isaac.GetItemIdByName("Shadow Device")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_SHADOWDEVICE] = "COLLECTIBLE_SHADOWDEVICE"
____exports.CollectibleTypeLab.COLLECTIBLE_CHESTOFSIN = Isaac.GetItemIdByName("Chest of Sin")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_CHESTOFSIN] = "COLLECTIBLE_CHESTOFSIN"
____exports.CollectibleTypeLab.COLLECTIBLE_RUNICAMPLIFIER = Isaac.GetItemIdByName("Runic Amplifier")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_RUNICAMPLIFIER] = "COLLECTIBLE_RUNICAMPLIFIER"
____exports.CollectibleTypeLab.COLLECTIBLE_GLOWINGHEART = Isaac.GetItemIdByName("Glowing Heart")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_GLOWINGHEART] = "COLLECTIBLE_GLOWINGHEART"
____exports.CollectibleTypeLab.COLLECTIBLE_PILLMACHINE = Isaac.GetItemIdByName("Pill Machine")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_PILLMACHINE] = "COLLECTIBLE_PILLMACHINE"
____exports.CollectibleTypeLab.COLLECTIBLE_JAROFHEADS = Isaac.GetItemIdByName("Jar of Heads")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_JAROFHEADS] = "COLLECTIBLE_JAROFHEADS"
____exports.CollectibleTypeLab.COLLECTIBLE_SILVERNICKEL = Isaac.GetItemIdByName("Silver Nickel")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_SILVERNICKEL] = "COLLECTIBLE_SILVERNICKEL"
____exports.CollectibleTypeLab.COLLECTIBLE_METALFEATHER = Isaac.GetItemIdByName("Metal Feather")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_METALFEATHER] = "COLLECTIBLE_METALFEATHER"
____exports.CollectibleTypeLab.COLLECTIBLE_BIGBOXOFSPIDERS = Isaac.GetItemIdByName("Big Box of Spiders")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_BIGBOXOFSPIDERS] = "COLLECTIBLE_BIGBOXOFSPIDERS"
____exports.CollectibleTypeLab.COLLECTIBLE_BOMBDISPENSER = Isaac.GetItemIdByName("Bomb Dispenser")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_BOMBDISPENSER] = "COLLECTIBLE_BOMBDISPENSER"
____exports.CollectibleTypeLab.COLLECTIBLE_MATTERREARRANGER = Isaac.GetItemIdByName("Matter Rearranger")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_MATTERREARRANGER] = "COLLECTIBLE_MATTERREARRANGER"
____exports.CollectibleTypeLab.COLLECTIBLE_FORGETMELATER = Isaac.GetItemIdByName("Forget Me Later")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_FORGETMELATER] = "COLLECTIBLE_FORGETMELATER"
____exports.CollectibleTypeLab.COLLECTIBLE_BLOODSAW = Isaac.GetItemIdByName("Blood Saw")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_BLOODSAW] = "COLLECTIBLE_BLOODSAW"
____exports.CollectibleTypeLab.COLLECTIBLE_DIVINITYGENERATOR = Isaac.GetItemIdByName("Divinity Generator")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_DIVINITYGENERATOR] = "COLLECTIBLE_DIVINITYGENERATOR"
____exports.CollectibleTypeLab.COLLECTIBLE_SATANITYGENERATOR = Isaac.GetItemIdByName("Satanity Generator")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_SATANITYGENERATOR] = "COLLECTIBLE_SATANITYGENERATOR"
____exports.CollectibleTypeLab.COLLECTIBLE_GOLDENNICKEL = Isaac.GetItemIdByName("Golden Nickel")
____exports.CollectibleTypeLab[____exports.CollectibleTypeLab.COLLECTIBLE_GOLDENNICKEL] = "COLLECTIBLE_GOLDENNICKEL"
return ____exports
end,
["extMath"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.shuffleArray(self, array)
    do
        local i = #array - 1
        while i > 0 do
            local j = math.floor(
                math.random() * (i + 1)
            )
            array[i + 1], array[j + 1] = table.unpack({array[j + 1], array[i + 1]})
            i = i - 1
        end
    end
end
function ____exports.lerp(self, a, b, pos)
    return a + ((b - a) * pos)
end
function ____exports.tanh(self, x)
    return (math.exp(x) - math.exp(-x)) / (math.exp(x) + math.exp(-x))
end
function ____exports.randomInt(self, rand, min, max)
    return math.floor(
        rand:RandomFloat() * ((max - min) + 1)
    ) + min
end
function ____exports.randRound(self, num, rand)
    local trailing = num - math.floor(num)
    if rand:RandomFloat() < trailing then
        return math.ceil(num)
    end
    return math.floor(num)
end
function ____exports.randomSign(self, rand)
    if rand:RandomFloat() < 0.5 then
        return -1
    end
    return 1
end
return ____exports
end,
["isaacScriptInit"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local overwriteError, isaacScriptError
function overwriteError(self)
    if ___LUA_ERROR_BACKUP == nil then
        ___LUA_ERROR_BACKUP = error
    end
    error = isaacScriptError
end
function isaacScriptError(err, _level)
    local msg
    if (err == nil) or (err == "") then
        msg = "Lua error (with a blank error message)"
    else
        msg = "Lua error: " .. err
    end
    Isaac.DebugString(msg)
    Isaac.ConsoleOutput(msg)
    if debug ~= nil then
        local tracebackLines = __TS__StringSplit(
            debug.traceback(),
            "\n"
        )
        do
            local i = 0
            while i < #tracebackLines do
                do
                    if (i == 0) or (i == 1) then
                        goto __continue9
                    end
                    local line = tracebackLines[i + 1]
                    Isaac.DebugString(line)
                end
                ::__continue9::
                i = i + 1
            end
        end
    end
    ___LUA_ERROR_BACKUP("(See above error messages.)")
end
function ____exports.default(self)
    overwriteError(nil)
end
return ____exports
end,
["utils"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
function ____exports.spawnPickupCluster(self, amount, position, rand, variant, subType, placeFree)
    if placeFree == nil then
        placeFree = false
    end
    local velocity = Vector(0, 0)
    do
        local i = 0
        while i < amount do
            if placeFree then
                position = Isaac.GetFreeNearPosition(position, 5)
            else
                velocity = Vector(
                    (rand:RandomFloat() * 4) - 2,
                    (rand:RandomFloat() * 4) - 2
                )
            end
            Game():Spawn(
                EntityType.ENTITY_PICKUP,
                variant,
                position,
                velocity,
                nil,
                subType,
                rand:GetSeed()
            )
            i = i + 1
        end
    end
end
function ____exports.getCoinVal(self, pickup, useDevil)
    if useDevil == nil then
        useDevil = false
    end
    local ____switch3 = pickup.Variant
    if ____switch3 == PickupVariant.PICKUP_COIN then
        goto ____switch3_case_0
    elseif ____switch3 == PickupVariant.PICKUP_COLLECTIBLE then
        goto ____switch3_case_1
    elseif ____switch3 == PickupVariant.PICKUP_HEART then
        goto ____switch3_case_2
    elseif ____switch3 == PickupVariant.PICKUP_KEY then
        goto ____switch3_case_3
    elseif ____switch3 == PickupVariant.PICKUP_BOMB then
        goto ____switch3_case_4
    elseif ____switch3 == PickupVariant.PICKUP_LIL_BATTERY then
        goto ____switch3_case_5
    elseif ____switch3 == PickupVariant.PICKUP_TAROTCARD then
        goto ____switch3_case_6
    elseif ____switch3 == PickupVariant.PICKUP_PILL then
        goto ____switch3_case_7
    elseif ____switch3 == PickupVariant.PICKUP_GRAB_BAG then
        goto ____switch3_case_8
    end
    goto ____switch3_case_default
    ::____switch3_case_0::
    do
        return pickup:GetCoinValue()
    end
    ::____switch3_case_1::
    do
        if useDevil then
            return Isaac.GetItemConfig():GetCollectible(pickup.SubType).DevilPrice * 15
        end
        return 15
    end
    ::____switch3_case_2::
    do
        local ____switch5 = pickup.SubType
        if ____switch5 == HeartSubType.HEART_FULL then
            goto ____switch5_case_0
        elseif ____switch5 == HeartSubType.HEART_HALF then
            goto ____switch5_case_2
        elseif ____switch5 == HeartSubType.HEART_DOUBLEPACK then
            goto ____switch5_case_3
        elseif ____switch5 == HeartSubType.HEART_SOUL then
            goto ____switch5_case_4
        elseif ____switch5 == HeartSubType.HEART_HALF_SOUL then
            goto ____switch5_case_5
        end
        goto ____switch5_case_default
        ::____switch5_case_0::
        do
        end
        ::____switch5_case_default::
        do
            return 3
        end
        ::____switch5_case_2::
        do
            return 1
        end
        ::____switch5_case_3::
        do
            return 6
        end
        ::____switch5_case_4::
        do
            return 5
        end
        ::____switch5_case_5::
        do
            return 3
        end
        ::____switch5_end::
    end
    ::____switch3_case_3::
    do
        if pickup.SubType == KeySubType.KEY_NORMAL then
            return 5
        end
        if pickup.SubType == KeySubType.KEY_DOUBLEPACK then
            return 10
        end
        goto ____switch3_end
    end
    ::____switch3_case_4::
    do
        if pickup.SubType == BombSubType.BOMB_NORMAL then
            return 5
        end
        if pickup.SubType == BombSubType.BOMB_DOUBLEPACK then
            return 10
        end
        goto ____switch3_end
    end
    ::____switch3_case_5::
    do
        if pickup.SubType == BatterySubType.BATTERY_NORMAL then
            return 5
        end
        if pickup.SubType == BatterySubType.BATTERY_MICRO then
            return 2
        end
        goto ____switch3_end
    end
    ::____switch3_case_6::
    do
    end
    ::____switch3_case_7::
    do
        return 5
    end
    ::____switch3_case_8::
    do
        return 7
    end
    ::____switch3_case_default::
    do
        return 0
    end
    ::____switch3_end::
    return 0
end
function ____exports.spawnCoins(self, amount, position, rand, consolidate, placeFree)
    if consolidate == nil then
        consolidate = false
    end
    if placeFree == nil then
        placeFree = false
    end
    if not consolidate then
        ____exports.spawnPickupCluster(nil, amount, position, rand, PickupVariant.PICKUP_COIN, CoinSubType.COIN_PENNY, placeFree)
        return
    end
    local velocity = Vector(0, 0)
    do
        local c = amount
        while c > 0 do
            if placeFree then
                position = Isaac.GetFreeNearPosition(position, 1)
            else
                velocity = Vector(
                    (rand:RandomFloat() * 4) - 2,
                    (rand:RandomFloat() * 4) - 2
                )
            end
            local coinType = CoinSubType.COIN_PENNY
            local spawnedVal = 1
            if c >= 10 then
                coinType = CoinSubType.COIN_DIME
                spawnedVal = 10
            elseif c >= 5 then
                coinType = CoinSubType.COIN_NICKEL
                spawnedVal = 5
            end
            Game():Spawn(
                EntityType.ENTITY_PICKUP,
                PickupVariant.PICKUP_COIN,
                position,
                velocity,
                nil,
                coinType,
                rand:GetSeed()
            )
            c = c - spawnedVal
        end
    end
end
function ____exports.spawnHearts(self, amount, position, rand, subtype, consolidate, placeFree)
    if consolidate == nil then
        consolidate = false
    end
    if placeFree == nil then
        placeFree = false
    end
    if not consolidate then
        ____exports.spawnPickupCluster(nil, amount, position, rand, PickupVariant.PICKUP_HEART, subtype, placeFree)
        return
    end
    local quadType = nil
    local doubleType = nil
    local singleType = HeartSubType.HEART_HALF
    local ____switch21 = subtype
    if ____switch21 == HeartSubType.HEART_BLACK then
        goto ____switch21_case_0
    elseif ____switch21 == HeartSubType.HEART_BLENDED then
        goto ____switch21_case_1
    elseif ____switch21 == HeartSubType.HEART_BONE then
        goto ____switch21_case_2
    elseif ____switch21 == HeartSubType.HEART_ETERNAL then
        goto ____switch21_case_3
    elseif ____switch21 == HeartSubType.HEART_GOLDEN then
        goto ____switch21_case_4
    elseif ____switch21 == HeartSubType.HEART_SCARED then
        goto ____switch21_case_5
    elseif ____switch21 == HeartSubType.HEART_DOUBLEPACK then
        goto ____switch21_case_7
    elseif ____switch21 == HeartSubType.HEART_FULL then
        goto ____switch21_case_8
    elseif ____switch21 == HeartSubType.HEART_HALF then
        goto ____switch21_case_9
    elseif ____switch21 == HeartSubType.HEART_SOUL then
        goto ____switch21_case_10
    elseif ____switch21 == HeartSubType.HEART_HALF_SOUL then
        goto ____switch21_case_11
    end
    goto ____switch21_case_default
    ::____switch21_case_0::
    do
    end
    ::____switch21_case_1::
    do
    end
    ::____switch21_case_2::
    do
    end
    ::____switch21_case_3::
    do
    end
    ::____switch21_case_4::
    do
    end
    ::____switch21_case_5::
    do
    end
    ::____switch21_case_default::
    do
        ____exports.spawnPickupCluster(nil, amount, position, rand, PickupVariant.PICKUP_HEART, subtype, placeFree)
        return
    end
    ::____switch21_case_7::
    do
        amount = amount * 4
        quadType = HeartSubType.HEART_DOUBLEPACK
        doubleType = HeartSubType.HEART_FULL
        singleType = HeartSubType.HEART_HALF
        goto ____switch21_end
    end
    ::____switch21_case_8::
    do
        amount = amount * 2
        quadType = HeartSubType.HEART_DOUBLEPACK
        doubleType = HeartSubType.HEART_FULL
        singleType = HeartSubType.HEART_HALF
        goto ____switch21_end
    end
    ::____switch21_case_9::
    do
        quadType = HeartSubType.HEART_DOUBLEPACK
        doubleType = HeartSubType.HEART_FULL
        singleType = HeartSubType.HEART_HALF
        goto ____switch21_end
    end
    ::____switch21_case_10::
    do
        amount = amount * 2
        doubleType = HeartSubType.HEART_SOUL
        singleType = HeartSubType.HEART_HALF_SOUL
        goto ____switch21_end
    end
    ::____switch21_case_11::
    do
        doubleType = HeartSubType.HEART_SOUL
        singleType = HeartSubType.HEART_HALF_SOUL
        goto ____switch21_end
    end
    ::____switch21_end::
    local velocity = Vector(0, 0)
    do
        local h = amount
        while h > 0 do
            if placeFree then
                position = Isaac.GetFreeNearPosition(position, 5)
            else
                velocity = Vector(
                    (rand:RandomFloat() * 4) - 2,
                    (rand:RandomFloat() * 4) - 2
                )
            end
            local heartType = singleType
            local spawnedVal = 1
            if (quadType ~= nil) and (h >= 4) then
                heartType = quadType
                spawnedVal = 4
            elseif (doubleType ~= nil) and (h >= 2) then
                heartType = doubleType
                spawnedVal = 2
            end
            Game():Spawn(
                EntityType.ENTITY_PICKUP,
                PickupVariant.PICKUP_HEART,
                position,
                velocity,
                nil,
                heartType,
                rand:GetSeed()
            )
            h = h - spawnedVal
        end
    end
end
function ____exports.spawnPickup(self, position, rand, variant, subType, placeFree)
    if placeFree == nil then
        placeFree = false
    end
    ____exports.spawnPickupCluster(nil, 1, position, rand, variant, subType, placeFree)
end
function ____exports.randomCollectible(self, rand)
    local enumEntries = __TS__ObjectEntries(CollectibleTypeLab)
    local randomIndex = math.floor(
        rand:RandomFloat() * #enumEntries
    )
    if type(enumEntries[randomIndex + 1][1]) == "number" then
        return enumEntries[randomIndex + 1][1]
    end
    return enumEntries[randomIndex + 1][2]
end
function ____exports.playSound(self, sound, volume, frameDelay, loop, pitch)
    if volume == nil then
        volume = 1
    end
    if frameDelay == nil then
        frameDelay = 0
    end
    if loop == nil then
        loop = false
    end
    if pitch == nil then
        pitch = 1
    end
    local effEntity = Isaac.Spawn(EntityType.ENTITY_FLY, 0, 0, Vector.Zero, Vector.Zero, nil)
    effEntity:ToNPC():PlaySound(sound, volume, frameDelay, loop, pitch)
    effEntity:Remove()
end
return ____exports
end,
["items.active.upgraded.digitalCard"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local extMath = require("extMath")
local ____utils = require("utils")
local getCoinVal = ____utils.getCoinVal
local spawnCoins = ____utils.spawnCoins
local spawnHearts = ____utils.spawnHearts
local spawnPickupCluster = ____utils.spawnPickupCluster
local doSilentGoldenRazor, doReversedHermit, doTower, doDeath, doLovers, validAceTarget, doGenericAce, doAceHearts, doTwoClubs, doTwoSpades, doTwoDiamonds, doTwoHearts
function doSilentGoldenRazor(self, player, ____repeat)
    if ____repeat == nil then
        ____repeat = 1
    end
    local coins = player:GetNumCoins()
    do
        local i = 0
        while i < ____repeat do
            player:UseActiveItem(CollectibleType.COLLECTIBLE_GOLDEN_RAZOR, false, true, true, false)
            i = i + 1
        end
    end
    player:AddCoins(
        coins - player:GetNumCoins()
    )
end
function doReversedHermit(self, player, room, hasTarot, rand)
    local sold = false
    local entities = room:GetEntities()
    do
        local i = 0
        while i < entities.Size do
            do
                local entity = entities:Get(i)
                if entity == nil then
                    goto __continue18
                end
                if entity.Type ~= EntityType.ENTITY_PICKUP then
                    goto __continue18
                end
                local testSell = entity:ToPickup()
                if testSell.Variant == PickupVariant.PICKUP_COIN then
                    goto __continue18
                end
                local val = getCoinVal(nil, testSell)
                if val > 0 then
                    sold = true
                else
                    goto __continue18
                end
                spawnCoins(
                    nil,
                    math.floor(val * 1.19),
                    testSell.Position,
                    rand,
                    true
                )
                testSell:Remove()
            end
            ::__continue18::
            i = i + 1
        end
    end
    if (not sold) or hasTarot then
        local looseCoins = 2
        if (not sold) and hasTarot then
            looseCoins = 4
        end
        spawnCoins(nil, looseCoins, player.Position, rand, true, true)
    end
end
function doTower(self, player, rand, oddsTroll, count, avgDist)
    do
        local i = 0
        while i < count do
            local subType = BombSubType.BOMB_NORMAL
            if rand:RandomFloat() < oddsTroll then
                subType = BombSubType.BOMB_TROLL
            end
            local shiftX = avgDist
            local shiftY = avgDist
            shiftX = shiftX * ((rand:RandomFloat() / 4) + 0.875)
            shiftY = shiftY * ((rand:RandomFloat() / 4) + 0.875)
            shiftX = shiftX * extMath:randomSign(rand)
            shiftY = shiftY * extMath:randomSign(rand)
            local shift = Vector(shiftX, shiftY)
            local position = player.Position:__add(shift)
            if subType == BombSubType.BOMB_TROLL then
                position = position:__add(shift)
            end
            position = Isaac.GetFreeNearPosition(position, 5)
            local velocity = Vector(
                (rand:RandomFloat() * 4) - 2,
                (rand:RandomFloat() * 4) - 2
            )
            Game():Spawn(
                EntityType.ENTITY_PICKUP,
                PickupVariant.PICKUP_BOMB,
                position,
                velocity,
                nil,
                subType,
                rand:GetSeed()
            )
            i = i + 1
        end
    end
end
function doDeath(self, player, room, hasTarot)
    player:UseCard(Card.CARD_DEATH)
    if hasTarot then
        player:UseCard(Card.CARD_DEATH)
    end
    local entities = room:GetEntities()
    do
        local i = 0
        while i < entities.Size do
            do
                local entity = entities:Get(i)
                if entity == nil then
                    goto __continue32
                end
                if not entity:IsActiveEnemy(false) then
                    goto __continue32
                end
                if (entity:GetEntityFlags() & EntityFlag.FLAG_FRIENDLY) == EntityFlag.FLAG_FRIENDLY then
                    goto __continue32
                end
                if (entity:GetEntityFlags() & EntityFlag.FLAG_CHARM) == EntityFlag.FLAG_CHARM then
                    goto __continue32
                end
                if hasTarot then
                    entity:AddFear(
                        EntityRef(player),
                        60
                    )
                else
                    entity:AddFear(
                        EntityRef(player),
                        30
                    )
                end
            end
            ::__continue32::
            i = i + 1
        end
    end
end
function doLovers(self, player, hasTarot, rand)
    local points = 5
    if hasTarot then
        points = points * 2
    end
    if (player:GetPlayerType() == Isaac.GetPlayerTypeByName("Keeper")) or (player:GetPlayerType() == Isaac.GetPlayerTypeByName("Keeper", true)) then
        spawnCoins(nil, points / 2, player.Position, rand, false, true)
        return
    end
    local spawnAmount = points
    local spawnType = HeartSubType.HEART_HALF
    if player:HasFullHearts() then
        spawnAmount = spawnAmount / 2
        spawnType = HeartSubType.HEART_HALF_SOUL
    end
    do
        local i = 0
        while i < spawnAmount do
            local position = Isaac.GetFreeNearPosition(player.Position, 5)
            local velocity = Vector(
                (rand:RandomFloat() * 4) - 2,
                (rand:RandomFloat() * 4) - 2
            )
            Game():Spawn(
                EntityType.ENTITY_PICKUP,
                PickupVariant.PICKUP_HEART,
                position,
                velocity,
                nil,
                spawnType,
                rand:GetSeed()
            )
            i = i + 1
        end
    end
end
function validAceTarget(self, entity, variant)
    if entity == nil then
        return false
    end
    if not entity:IsActiveEnemy(false) then
        if entity.Type ~= EntityType.ENTITY_PICKUP then
            return false
        end
        local pickup = entity:ToPickup()
        if pickup:IsShopItem() then
            return false
        end
        if pickup.Variant == PickupVariant.PICKUP_TROPHY then
            return false
        end
        if pickup.Variant == PickupVariant.PICKUP_COLLECTIBLE then
            return false
        end
        if pickup.Variant == PickupVariant.PICKUP_BED then
            return false
        end
        if pickup.Variant == PickupVariant.PICKUP_BIGCHEST then
            return false
        end
        if pickup.Variant == variant then
            return false
        end
        return true
    end
    if (entity:GetEntityFlags() & EntityFlag.FLAG_FRIENDLY) == EntityFlag.FLAG_FRIENDLY then
        return false
    end
    if entity:IsBoss() then
        return false
    end
    return true
end
function doGenericAce(self, currentCard, room, hasTarot, rand, doubleOdds)
    if hasTarot then
        doubleOdds = doubleOdds * 2
    end
    local variant = PickupVariant.PICKUP_NULL
    local subtype = 0
    local ____switch58 = currentCard
    if ____switch58 == Card.CARD_ACE_OF_DIAMONDS then
        goto ____switch58_case_0
    elseif ____switch58 == Card.CARD_ACE_OF_SPADES then
        goto ____switch58_case_1
    elseif ____switch58 == Card.CARD_ACE_OF_CLUBS then
        goto ____switch58_case_2
    end
    goto ____switch58_case_default
    ::____switch58_case_0::
    do
        variant = PickupVariant.PICKUP_COIN
        subtype = CoinSubType.COIN_PENNY
        goto ____switch58_end
    end
    ::____switch58_case_1::
    do
        variant = PickupVariant.PICKUP_KEY
        subtype = KeySubType.KEY_NORMAL
        goto ____switch58_end
    end
    ::____switch58_case_2::
    do
        variant = PickupVariant.PICKUP_BOMB
        subtype = BombSubType.BOMB_NORMAL
        goto ____switch58_end
    end
    ::____switch58_case_default::
    do
        return
    end
    ::____switch58_end::
    local entities = room:GetEntities()
    do
        local i = 0
        while i < entities.Size do
            do
                local entity = entities:Get(i)
                if entity == nil then
                    goto __continue59
                end
                local amount = 1
                if rand:RandomFloat() < doubleOdds then
                    amount = amount + 1
                end
                if validAceTarget(nil, entity, variant) then
                    spawnPickupCluster(nil, amount, entity.Position, rand, variant, subtype)
                    entity:Remove()
                end
            end
            ::__continue59::
            i = i + 1
        end
    end
end
function doAceHearts(self, room, hasTarot, rand, doubleOdds, soulOdds, evilOdds)
    if hasTarot then
        doubleOdds = doubleOdds * 2
    end
    local entities = room:GetEntities()
    do
        local i = 0
        while i < entities.Size do
            do
                local entity = entities:Get(i)
                if entity == nil then
                    goto __continue65
                end
                local amount = 1
                if rand:RandomFloat() < doubleOdds then
                    amount = amount + 1
                end
                if validAceTarget(nil, entity, PickupVariant.PICKUP_HEART) then
                    local subtype = HeartSubType.HEART_FULL
                    if rand:RandomFloat() < soulOdds then
                        subtype = HeartSubType.HEART_SOUL
                        if rand:RandomFloat() < evilOdds then
                            subtype = HeartSubType.HEART_BLACK
                        end
                    end
                    spawnPickupCluster(nil, amount, entity.Position, rand, PickupVariant.PICKUP_HEART, subtype)
                    entity:Remove()
                end
            end
            ::__continue65::
            i = i + 1
        end
    end
end
function doTwoClubs(self, player, rand, mult)
    local count = player:GetNumBombs()
    if count < 1 then
        count = 1
    end
    player:AddBombs(
        extMath:randRound(count * (mult - 1), rand)
    )
end
function doTwoSpades(self, player, rand, mult)
    local count = player:GetNumKeys()
    if count < 1 then
        count = 1
    end
    player:AddKeys(
        extMath:randRound(count * (mult - 1), rand)
    )
end
function doTwoDiamonds(self, player, rand, mult)
    local count = player:GetNumCoins()
    if count < 1 then
        count = 1
    end
    player:AddCoins(
        extMath:randRound(count * (mult - 1), rand)
    )
end
function doTwoHearts(self, player, rand, mult, hasTarot)
    if hasTarot then
        mult = mult * mult
    end
    local count = player:GetHearts()
    local addCount = extMath:randRound(count * (mult - 1), rand)
    local redCount = math.min(
        player:GetEffectiveMaxHearts() - count,
        addCount
    )
    if redCount <= 0 then
        redCount = 1
    end
    player:AddHearts(redCount)
    addCount = addCount - redCount
    if addCount <= 0 then
        return
    end
    player:AddSoulHearts(
        math.floor(addCount / 6)
    )
end
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_DIGITALCARD
end
function ____exports.use(self, _type, rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    local room = Game():GetRoom()
    local level = Game():GetLevel()
    local currentCard = player:GetCard(0)
    if (currentCard == nil) or (currentCard == 0) then
        return false
    end
    local hasTarot = player:HasCollectible(CollectibleType.COLLECTIBLE_TAROT_CLOTH)
    local ____switch5 = currentCard
    if ____switch5 == Card.CARD_RULES then
        goto ____switch5_case_0
    elseif ____switch5 == Card.CARD_HIGH_PRIESTESS then
        goto ____switch5_case_1
    elseif ____switch5 == Card.CARD_REVERSE_WORLD then
        goto ____switch5_case_2
    elseif ____switch5 == Card.CARD_CHARIOT then
        goto ____switch5_case_3
    elseif ____switch5 == Card.CARD_REVERSE_TOWER then
        goto ____switch5_case_4
    elseif ____switch5 == Card.CARD_ERA_WALK then
        goto ____switch5_case_5
    elseif ____switch5 == Card.CARD_REVERSE_DEVIL then
        goto ____switch5_case_6
    elseif ____switch5 == Card.CARD_REVERSE_DEATH then
        goto ____switch5_case_7
    elseif ____switch5 == Card.CARD_REVERSE_LOVERS then
        goto ____switch5_case_8
    elseif ____switch5 == Card.CARD_REVERSE_EMPRESS then
        goto ____switch5_case_9
    elseif ____switch5 == Card.CARD_REVERSE_MAGICIAN then
        goto ____switch5_case_10
    elseif ____switch5 == Card.CARD_WILD then
        goto ____switch5_case_11
    elseif ____switch5 == Card.CARD_REVERSE_TEMPERANCE then
        goto ____switch5_case_12
    elseif ____switch5 == Card.CARD_WHEEL_OF_FORTUNE then
        goto ____switch5_case_13
    elseif ____switch5 == Card.CARD_TEMPERANCE then
        goto ____switch5_case_14
    elseif ____switch5 == Card.CARD_JUDGEMENT then
        goto ____switch5_case_15
    elseif ____switch5 == Card.CARD_JUSTICE then
        goto ____switch5_case_16
    elseif ____switch5 == Card.CARD_SUN then
        goto ____switch5_case_17
    elseif ____switch5 == Card.CARD_ANCIENT_RECALL then
        goto ____switch5_case_18
    elseif ____switch5 == Card.CARD_REVERSE_FOOL then
        goto ____switch5_case_19
    elseif ____switch5 == Card.CARD_REVERSE_JUSTICE then
        goto ____switch5_case_20
    elseif ____switch5 == Card.CARD_REVERSE_STARS then
        goto ____switch5_case_21
    elseif ____switch5 == Card.CARD_REVERSE_JUDGEMENT then
        goto ____switch5_case_22
    elseif ____switch5 == Card.CARD_SUICIDE_KING then
        goto ____switch5_case_23
    elseif ____switch5 == Card.CARD_REVERSE_WHEEL_OF_FORTUNE then
        goto ____switch5_case_24
    elseif ____switch5 == Card.CARD_HOLY then
        goto ____switch5_case_25
    elseif ____switch5 == Card.CARD_FOOL then
        goto ____switch5_case_26
    elseif ____switch5 == Card.CARD_JOKER then
        goto ____switch5_case_27
    elseif ____switch5 == Card.CARD_GET_OUT_OF_JAIL then
        goto ____switch5_case_28
    elseif ____switch5 == Card.CARD_HERMIT then
        goto ____switch5_case_29
    elseif ____switch5 == Card.CARD_MOON then
        goto ____switch5_case_30
    elseif ____switch5 == Card.CARD_STARS then
        goto ____switch5_case_31
    elseif ____switch5 == Card.CARD_REVERSE_MOON then
        goto ____switch5_case_32
    elseif ____switch5 == Card.CARD_REVERSE_EMPEROR then
        goto ____switch5_case_33
    elseif ____switch5 == Card.CARD_REVERSE_HIGH_PRIESTESS then
        goto ____switch5_case_34
    elseif ____switch5 == Card.CARD_EMPEROR then
        goto ____switch5_case_35
    elseif ____switch5 == Card.CARD_HANGED_MAN then
        goto ____switch5_case_36
    elseif ____switch5 == Card.CARD_REVERSE_SUN then
        goto ____switch5_case_37
    elseif ____switch5 == Card.CARD_REVERSE_HANGED_MAN then
        goto ____switch5_case_38
    elseif ____switch5 == Card.CARD_HUMANITY then
        goto ____switch5_case_39
    elseif ____switch5 == Card.CARD_CREDIT then
        goto ____switch5_case_40
    elseif ____switch5 == Card.CARD_CHAOS then
        goto ____switch5_case_41
    elseif ____switch5 == Card.CARD_REVERSE_HERMIT then
        goto ____switch5_case_43
    elseif ____switch5 == Card.CARD_MAGICIAN then
        goto ____switch5_case_44
    elseif ____switch5 == Card.CARD_REVERSE_CHARIOT then
        goto ____switch5_case_45
    elseif ____switch5 == Card.CARD_DEVIL then
        goto ____switch5_case_46
    elseif ____switch5 == Card.CARD_EMPRESS then
        goto ____switch5_case_47
    elseif ____switch5 == Card.CARD_HUGE_GROWTH then
        goto ____switch5_case_48
    elseif ____switch5 == Card.CARD_STRENGTH then
        goto ____switch5_case_49
    elseif ____switch5 == Card.CARD_REVERSE_STRENGTH then
        goto ____switch5_case_50
    elseif ____switch5 == Card.CARD_WORLD then
        goto ____switch5_case_51
    elseif ____switch5 == Card.CARD_TOWER then
        goto ____switch5_case_52
    elseif ____switch5 == Card.CARD_DEATH then
        goto ____switch5_case_53
    elseif ____switch5 == Card.CARD_LOVERS then
        goto ____switch5_case_54
    elseif ____switch5 == Card.CARD_ACE_OF_CLUBS then
        goto ____switch5_case_55
    elseif ____switch5 == Card.CARD_ACE_OF_SPADES then
        goto ____switch5_case_56
    elseif ____switch5 == Card.CARD_ACE_OF_DIAMONDS then
        goto ____switch5_case_57
    elseif ____switch5 == Card.CARD_ACE_OF_HEARTS then
        goto ____switch5_case_58
    elseif ____switch5 == Card.CARD_HIEROPHANT then
        goto ____switch5_case_59
    elseif ____switch5 == Card.CARD_REVERSE_HIEROPHANT then
        goto ____switch5_case_60
    elseif ____switch5 == Card.CARD_CLUBS_2 then
        goto ____switch5_case_61
    elseif ____switch5 == Card.CARD_SPADES_2 then
        goto ____switch5_case_62
    elseif ____switch5 == Card.CARD_DIAMONDS_2 then
        goto ____switch5_case_63
    elseif ____switch5 == Card.CARD_HEARTS_2 then
        goto ____switch5_case_64
    elseif ____switch5 == Card.CARD_QUEEN_OF_HEARTS then
        goto ____switch5_case_65
    end
    goto ____switch5_case_default
    ::____switch5_case_0::
    do
    end
    ::____switch5_case_1::
    do
    end
    ::____switch5_case_2::
    do
    end
    ::____switch5_case_3::
    do
    end
    ::____switch5_case_4::
    do
    end
    ::____switch5_case_5::
    do
    end
    ::____switch5_case_6::
    do
    end
    ::____switch5_case_7::
    do
    end
    ::____switch5_case_8::
    do
    end
    ::____switch5_case_9::
    do
    end
    ::____switch5_case_10::
    do
    end
    ::____switch5_case_11::
    do
    end
    ::____switch5_case_12::
    do
    end
    ::____switch5_case_13::
    do
    end
    ::____switch5_case_14::
    do
    end
    ::____switch5_case_15::
    do
    end
    ::____switch5_case_16::
    do
    end
    ::____switch5_case_17::
    do
    end
    ::____switch5_case_18::
    do
    end
    ::____switch5_case_19::
    do
    end
    ::____switch5_case_20::
    do
    end
    ::____switch5_case_21::
    do
    end
    ::____switch5_case_22::
    do
        player:UseCard(currentCard)
        if hasTarot then
            player:UseCard(currentCard)
        end
        goto ____switch5_end
    end
    ::____switch5_case_23::
    do
    end
    ::____switch5_case_24::
    do
    end
    ::____switch5_case_25::
    do
    end
    ::____switch5_case_26::
    do
    end
    ::____switch5_case_27::
    do
    end
    ::____switch5_case_28::
    do
    end
    ::____switch5_case_29::
    do
    end
    ::____switch5_case_30::
    do
    end
    ::____switch5_case_31::
    do
    end
    ::____switch5_case_32::
    do
    end
    ::____switch5_case_33::
    do
    end
    ::____switch5_case_34::
    do
    end
    ::____switch5_case_35::
    do
    end
    ::____switch5_case_36::
    do
    end
    ::____switch5_case_37::
    do
    end
    ::____switch5_case_38::
    do
    end
    ::____switch5_case_39::
    do
    end
    ::____switch5_case_40::
    do
    end
    ::____switch5_case_41::
    do
    end
    ::____switch5_case_default::
    do
        player:UseCard(currentCard)
        goto ____switch5_end
    end
    ::____switch5_case_43::
    do
        doReversedHermit(nil, player, room, hasTarot, rand)
        goto ____switch5_end
    end
    ::____switch5_case_44::
    do
    end
    ::____switch5_case_45::
    do
    end
    ::____switch5_case_46::
    do
    end
    ::____switch5_case_47::
    do
    end
    ::____switch5_case_48::
    do
        player:UseCard(currentCard)
        doSilentGoldenRazor(nil, player)
        if hasTarot then
            player:UseCard(currentCard)
            doSilentGoldenRazor(nil, player)
        end
        goto ____switch5_end
    end
    ::____switch5_case_49::
    do
    end
    ::____switch5_case_50::
    do
        player:UseCard(Card.CARD_STRENGTH)
        player:UseCard(Card.CARD_REVERSE_STRENGTH)
        if hasTarot then
            player:UseCard(Card.CARD_STRENGTH)
            player:UseCard(Card.CARD_REVERSE_STRENGTH)
        end
        goto ____switch5_end
    end
    ::____switch5_case_51::
    do
        if hasTarot then
            level:RemoveCurses(LevelCurse.CURSE_OF_THE_LOST)
        end
        player:UseCard(currentCard)
        goto ____switch5_end
    end
    ::____switch5_case_52::
    do
        if hasTarot then
            doTower(nil, player, rand, 0.6, 14, 50)
        else
            doTower(nil, player, rand, 0.8, 7, 50)
        end
        goto ____switch5_end
    end
    ::____switch5_case_53::
    do
        doDeath(nil, player, room, hasTarot)
        goto ____switch5_end
    end
    ::____switch5_case_54::
    do
        doLovers(nil, player, hasTarot, rand)
        goto ____switch5_end
    end
    ::____switch5_case_55::
    do
    end
    ::____switch5_case_56::
    do
    end
    ::____switch5_case_57::
    do
        doGenericAce(nil, currentCard, room, hasTarot, rand, 0.25)
        goto ____switch5_end
    end
    ::____switch5_case_58::
    do
        doAceHearts(nil, room, hasTarot, rand, 0.15, 0.4, 0.15)
        goto ____switch5_end
    end
    ::____switch5_case_59::
    do
        spawnHearts(nil, (hasTarot and 5) or 2.5, player.Position, rand, HeartSubType.HEART_SOUL, true, true)
        goto ____switch5_end
    end
    ::____switch5_case_60::
    do
        spawnHearts(nil, (hasTarot and 5) or 2, player.Position, rand, HeartSubType.HEART_BONE, false, true)
        goto ____switch5_end
    end
    ::____switch5_case_61::
    do
        doTwoClubs(nil, player, rand, 1.75)
        if hasTarot then
            doTwoClubs(nil, player, rand, 1.75)
        end
        goto ____switch5_end
    end
    ::____switch5_case_62::
    do
        doTwoSpades(nil, player, rand, 1.75)
        if hasTarot then
            doTwoSpades(nil, player, rand, 1.75)
        end
        goto ____switch5_end
    end
    ::____switch5_case_63::
    do
        doTwoDiamonds(nil, player, rand, 1.5)
        if hasTarot then
            doTwoDiamonds(nil, player, rand, 1.5)
        end
        goto ____switch5_end
    end
    ::____switch5_case_64::
    do
        doTwoHearts(nil, player, rand, 2.5, hasTarot)
        goto ____switch5_end
    end
    ::____switch5_case_65::
    do
        spawnHearts(
            nil,
            math.floor(
                (rand:RandomFloat() * 14) + 1
            ) * ((hasTarot and 2) or 1),
            player.Position,
            rand,
            HeartSubType.HEART_FULL,
            true,
            true
        )
        goto ____switch5_end
    end
    ::____switch5_end::
    return true
end
return ____exports
end,
["items.active.upgraded.cartographersTome"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_CARTOGRAPHERTOME
end
function ____exports.use(self, _type, _rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    local level = Game():GetLevel()
    level:ApplyMapEffect()
    level:ApplyCompassEffect(true)
    level:ApplyBlueMapEffect()
    player:UsePill(PillEffect.PILLEFFECT_SEE_FOREVER, PillColor.PILL_NULL, UseFlag.USE_NOANIM)
    return true
end
return ____exports
end,
["items.active.upgraded.anarchistsEBook"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local extMath = require("extMath")
local ____utils = require("utils")
local spawnPickupCluster = ____utils.spawnPickupCluster
local BOMB_COUNT = 6
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_ANARCHISTEBOOK
end
function ____exports.use(self, _type, rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    local room = Game():GetRoom()
    local targets = {}
    local entities = room:GetEntities()
    do
        local i = 0
        while i < entities.Size do
            do
                local entity = entities:Get(i)
                if entity == nil then
                    goto __continue4
                end
                if entity:IsVulnerableEnemy() then
                    do
                        local l = 0
                        while l < math.ceil(
                            (entity.HitPoints / 100) + math.floor(
                                rand:RandomFloat() + 0.5
                            )
                        ) do
                            __TS__ArrayPush(
                                targets,
                                entity.Position:__add(
                                    Vector(
                                        20 * extMath:randomSign(rand),
                                        20 * extMath:randomSign(rand)
                                    )
                                )
                            )
                            l = l + 1
                        end
                    end
                elseif (entity.Type == EntityType.ENTITY_PICKUP) and (entity.Variant == PickupVariant.PICKUP_BOMBCHEST) then
                    __TS__ArrayPush(targets, entity.Position)
                elseif (entity.Type == EntityType.ENTITY_FIREPLACE) and ((entity.Variant == 2) or (entity.Variant == 3)) then
                    __TS__ArrayPush(targets, entity.Position)
                end
            end
            ::__continue4::
            i = i + 1
        end
    end
    do
        local g = 0
        while g < room:GetGridSize() do
            do
                local gridEnt = room:GetGridEntity(g)
                if gridEnt == nil then
                    goto __continue10
                end
                if (gridEnt:GetType() == GridEntityType.GRID_ROCKT) or (gridEnt:GetType() == GridEntityType.GRID_ROCK_SS) then
                    __TS__ArrayPush(
                        targets,
                        room:GetGridPosition(g)
                    )
                end
            end
            ::__continue10::
            g = g + 1
        end
    end
    if #targets > 0 then
        extMath:shuffleArray(targets)
    end
    do
        local s = 0
        while s < BOMB_COUNT do
            if #targets > 0 then
                Isaac.Spawn(
                    EntityType.ENTITY_PICKUP,
                    PickupVariant.PICKUP_BOMB,
                    BombSubType.BOMB_TROLL,
                    table.remove(targets),
                    Vector.Zero,
                    nil
                )
            else
                spawnPickupCluster(
                    nil,
                    math.floor((BOMB_COUNT - s) / 3),
                    player.Position,
                    rand,
                    PickupVariant.PICKUP_BOMB,
                    BombSubType.BOMB_NORMAL,
                    true
                )
                break
            end
            s = s + 1
        end
    end
    return true
end
return ____exports
end,
["items.active.upgraded.shadowDevice"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local extMath = require("extMath")
local triggerEffect
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_SHADOWDEVICE
end
function triggerEffect(self, player, hasCarBattery)
    player:UseActiveItem(CollectibleType.COLLECTIBLE_BOOK_OF_SHADOWS, UseFlag.USE_NOANIM)
    if hasCarBattery then
        player:UseActiveItem(CollectibleType.COLLECTIBLE_BOOK_OF_SHADOWS, UseFlag.USE_NOANIM + UseFlag.USE_CARBATTERY)
    end
end
local BASE_MAX_CHARGE = Isaac.GetItemConfig():GetCollectible(
    ____exports.ownType(nil)
).MaxCharges
local MAX_CHARGE_ODDS = 0.75
local MIN_CHARGE_ODDS = 0.25
function ____exports.use(self, _type, _rand, player, _UseFlags, ActiveSlot, _CustomVarData)
    triggerEffect(
        nil,
        player,
        player:HasCollectible(CollectibleType.COLLECTIBLE_CAR_BATTERY)
    )
    player:SetActiveCharge(
        player:GetActiveCharge(ActiveSlot) + (BASE_MAX_CHARGE - 3),
        ActiveSlot
    )
    return true
end
function ____exports.interceptDamage(self, TookDamage, DamageAmount, DamageFlags, _DamageSource, _DamageCountdownFrames)
    if ((DamageAmount <= 0) or ((DamageFlags & DamageFlag.DAMAGE_FAKE) == DamageFlag.DAMAGE_FAKE)) or ((DamageFlags ~ (DamageFlag.DAMAGE_NO_PENALTIES | DamageFlag.DAMAGE_SPIKES)) == 0) then
        return nil
    end
    local player = TookDamage:ToPlayer()
    if player == nil then
        return nil
    end
    if not player:HasCollectible(
        ____exports.ownType(nil),
        true
    ) then
        return nil
    end
    local charge = 0
    local itemSlot = 0
    do
        local slot = 0
        while slot <= ActiveSlot.SLOT_POCKET2 do
            if (player:GetActiveItem(slot) == ____exports.ownType(nil)) and (player:GetActiveCharge(slot) > charge) then
                itemSlot = slot
                charge = player:GetActiveCharge(slot)
            end
            slot = slot + 1
        end
    end
    local rand = player:GetCollectibleRNG(
        ____exports.ownType(nil)
    )
    local hasCarBattery = player:HasCollectible(CollectibleType.COLLECTIBLE_CAR_BATTERY)
    local triggerOdds = extMath:lerp(
        MIN_CHARGE_ODDS,
        MAX_CHARGE_ODDS,
        math.min(charge / BASE_MAX_CHARGE, 1)
    )
    if (player:GetSoulHearts() + player:GetBlackHearts()) >= DamageAmount then
        triggerOdds = triggerOdds / 2
    end
    if (DamageFlags & DamageFlag.DAMAGE_CURSED_DOOR) == DamageFlag.DAMAGE_CURSED_DOOR then
        triggerOdds = triggerOdds / 2
    end
    if rand:RandomFloat() < triggerOdds then
        player:SetActiveCharge(charge - 2, itemSlot)
        triggerEffect(nil, player, hasCarBattery)
        return false
    end
    if (charge > 0) and (player:GetHearts() <= DamageAmount) then
        player:SetActiveCharge(
            math.max(charge - 3, 0),
            itemSlot
        )
        triggerEffect(nil, player, hasCarBattery)
        return false
    end
    return nil
end
return ____exports
end,
["items.active.upgraded.chestOfSin"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_CHESTOFSIN
end
function ____exports.use(self, _type, rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    player:UseActiveItem(CollectibleType.COLLECTIBLE_BOOK_OF_SIN, UseFlag.USE_NOANIM)
    player:UseActiveItem(CollectibleType.COLLECTIBLE_BOOK_OF_SIN, UseFlag.USE_NOANIM)
    if rand:RandomFloat() < 0.75 then
        player:UseActiveItem(CollectibleType.COLLECTIBLE_BOOK_OF_SIN, UseFlag.USE_NOANIM)
    end
    return true
end
return ____exports
end,
["items.active.upgraded.runicAmplifier"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local extMath = require("extMath")
local ____utils = require("utils")
local spawnCoins = ____utils.spawnCoins
local spawnHearts = ____utils.spawnHearts
local spawnPickupCluster = ____utils.spawnPickupCluster
local doSilentGoldenRazor, doHagalaz, doJera
function doSilentGoldenRazor(self, player, ____repeat)
    if ____repeat == nil then
        ____repeat = 1
    end
    local coins = player:GetNumCoins()
    do
        local i = 0
        while i < ____repeat do
            player:UseActiveItem(CollectibleType.COLLECTIBLE_GOLDEN_RAZOR, false, true, true, false)
            i = i + 1
        end
    end
    player:AddCoins(
        coins - player:GetNumCoins()
    )
end
function doHagalaz(self, player, room)
    player:UseCard(Card.RUNE_HAGALAZ)
    local entities = room:GetEntities()
    do
        local i = 0
        while i < entities.Size do
            do
                local entity = entities:Get(i)
                if entity == nil then
                    goto __continue20
                end
                if entity.Type ~= EntityType.ENTITY_FIREPLACE then
                    goto __continue20
                end
                if ((((entity.Variant == 4) or (entity.Variant == 11)) or (entity.Variant == 10)) or (entity.Variant == 12)) or (entity.Variant == 13) then
                    goto __continue20
                end
                entity:Kill()
            end
            ::__continue20::
            i = i + 1
        end
    end
end
function doJera(self, player, rand, room, hasTarot)
    player:UseCard(Card.RUNE_JERA)
    if hasTarot then
        player:UseCard(Card.RUNE_JERA)
    end
    local entities = room:GetEntities()
    local pickupPresent = false
    do
        local i = 0
        while i < entities.Size do
            do
                local entity = entities:Get(i)
                if entity == nil then
                    goto __continue26
                end
                if entity.Type ~= EntityType.ENTITY_PICKUP then
                    goto __continue26
                end
                if (((((entity.Variant == PickupVariant.PICKUP_BED) or (entity.Variant == PickupVariant.PICKUP_BIGCHEST)) or (entity.Variant == PickupVariant.PICKUP_COLLECTIBLE)) or (entity.Variant == PickupVariant.PICKUP_MOMSCHEST)) or (entity.Variant == PickupVariant.PICKUP_TROPHY)) or (entity.Variant == PickupVariant.PICKUP_NULL) then
                    goto __continue26
                end
                pickupPresent = true
                break
            end
            ::__continue26::
            i = i + 1
        end
    end
    local justiceOdds = ((hasTarot and 1.25) or 0.5) + ((pickupPresent and 0) or 0.5)
    do
        local j = 0
        while j < extMath:randRound(justiceOdds, rand) do
            player:UseCard(Card.CARD_JUSTICE, UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER)
            j = j + 1
        end
    end
end
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_RUNICAMPLIFIER
end
function ____exports.use(self, _type, rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    local room = Game():GetRoom()
    local currentCard = player:GetCard(0)
    if (currentCard == nil) or (currentCard == 0) then
        return false
    end
    local hasTarot = player:HasCollectible(CollectibleType.COLLECTIBLE_TAROT_CLOTH)
    local ____switch5 = currentCard
    if ____switch5 == Card.RUNE_BLANK then
        goto ____switch5_case_0
    elseif ____switch5 == Card.CARD_SOUL_EVE then
        goto ____switch5_case_1
    elseif ____switch5 == Card.CARD_SOUL_ISAAC then
        goto ____switch5_case_2
    elseif ____switch5 == Card.CARD_SOUL_APOLLYON then
        goto ____switch5_case_3
    elseif ____switch5 == Card.RUNE_SHARD then
        goto ____switch5_case_4
    elseif ____switch5 == Card.RUNE_ANSUZ then
        goto ____switch5_case_5
    elseif ____switch5 == Card.CARD_SOUL_CAIN then
        goto ____switch5_case_6
    elseif ____switch5 == Card.CARD_SOUL_BLUEBABY then
        goto ____switch5_case_7
    elseif ____switch5 == Card.CARD_SOUL_JUDAS then
        goto ____switch5_case_8
    elseif ____switch5 == Card.CARD_SOUL_LOST then
        goto ____switch5_case_9
    elseif ____switch5 == Card.RUNE_BLACK then
        goto ____switch5_case_10
    elseif ____switch5 == Card.RUNE_EHWAZ then
        goto ____switch5_case_11
    elseif ____switch5 == Card.RUNE_PERTHRO then
        goto ____switch5_case_12
    elseif ____switch5 == Card.CARD_SOUL_EDEN then
        goto ____switch5_case_13
    elseif ____switch5 == Card.CARD_SOUL_JACOB then
        goto ____switch5_case_14
    elseif ____switch5 == Card.CARD_SOUL_LAZARUS then
        goto ____switch5_case_15
    elseif ____switch5 == Card.RUNE_BERKANO then
        goto ____switch5_case_16
    elseif ____switch5 == Card.RUNE_DAGAZ then
        goto ____switch5_case_17
    elseif ____switch5 == Card.RUNE_HAGALAZ then
        goto ____switch5_case_18
    elseif ____switch5 == Card.RUNE_ALGIZ then
        goto ____switch5_case_19
    elseif ____switch5 == Card.CARD_SOUL_MAGDALENE then
        goto ____switch5_case_20
    elseif ____switch5 == Card.CARD_SOUL_FORGOTTEN then
        goto ____switch5_case_21
    elseif ____switch5 == Card.CARD_SOUL_AZAZEL then
        goto ____switch5_case_22
    elseif ____switch5 == Card.CARD_SOUL_BETHANY then
        goto ____switch5_case_23
    elseif ____switch5 == Card.CARD_SOUL_SAMSON then
        goto ____switch5_case_24
    elseif ____switch5 == Card.RUNE_JERA then
        goto ____switch5_case_25
    elseif ____switch5 == Card.CARD_SOUL_KEEPER then
        goto ____switch5_case_26
    elseif ____switch5 == Card.CARD_SOUL_LILITH then
        goto ____switch5_case_27
    end
    goto ____switch5_case_default
    ::____switch5_case_0::
    do
    end
    ::____switch5_case_1::
    do
    end
    ::____switch5_case_2::
    do
    end
    ::____switch5_case_3::
    do
    end
    ::____switch5_case_4::
    do
        player:UseCard(currentCard)
        if hasTarot then
            player:UseCard(currentCard)
        end
        goto ____switch5_end
    end
    ::____switch5_case_5::
    do
    end
    ::____switch5_case_6::
    do
    end
    ::____switch5_case_7::
    do
    end
    ::____switch5_case_8::
    do
    end
    ::____switch5_case_9::
    do
    end
    ::____switch5_case_10::
    do
    end
    ::____switch5_case_11::
    do
    end
    ::____switch5_case_12::
    do
    end
    ::____switch5_case_13::
    do
    end
    ::____switch5_case_14::
    do
        player:UseCard(currentCard)
        goto ____switch5_end
    end
    ::____switch5_case_15::
    do
        player:UseCard(Card.CARD_SOUL_LAZARUS)
        spawnHearts(nil, (hasTarot and 2) or 1, player.Position, rand, HeartSubType.HEART_SOUL, true, true)
        goto ____switch5_end
    end
    ::____switch5_case_16::
    do
    end
    ::____switch5_case_17::
    do
        player:UseCard(currentCard)
        player:UseCard(currentCard)
        if hasTarot then
            player:UseCard(currentCard)
            player:UseCard(currentCard)
        end
        goto ____switch5_end
    end
    ::____switch5_case_18::
    do
        doHagalaz(nil, player, room)
        goto ____switch5_end
    end
    ::____switch5_case_19::
    do
        player:UseCard(Card.RUNE_ALGIZ)
        player:AddSoulHearts(1)
        if hasTarot then
            player:UseCard(Card.RUNE_ALGIZ)
            player:AddSoulHearts(1)
        end
        goto ____switch5_end
    end
    ::____switch5_case_20::
    do
        player:UseCard(Card.CARD_SOUL_MAGDALENE)
        player:AddHearts(2)
        if hasTarot then
            player:AddHearts(2)
        end
        goto ____switch5_end
    end
    ::____switch5_case_21::
    do
        player:UseCard(Card.CARD_SOUL_FORGOTTEN)
        if rand:RandomFloat() < 0.25 then
            spawnHearts(nil, 1, player.Position, rand, HeartSubType.HEART_BONE, true, true)
        end
        if hasTarot then
            player:UseCard(Card.CARD_SOUL_FORGOTTEN)
            spawnHearts(nil, 1, player.Position, rand, HeartSubType.HEART_BONE, true, true)
        end
        goto ____switch5_end
    end
    ::____switch5_case_22::
    do
        player:UseCard(Card.CARD_SOUL_AZAZEL)
        player:AddBlackHearts(2)
        if hasTarot then
            player:UseCard(Card.CARD_SOUL_AZAZEL)
            player:AddBlackHearts(2)
        end
        goto ____switch5_end
    end
    ::____switch5_case_23::
    do
        player:UseCard(Card.CARD_SOUL_BETHANY)
        if hasTarot then
            player:UseCard(Card.CARD_SOUL_BETHANY)
        end
        spawnPickupCluster(
            nil,
            extMath:randRound((hasTarot and 1.25) or 0.4, rand),
            player.Position,
            rand,
            PickupVariant.PICKUP_LIL_BATTERY,
            BatterySubType.BATTERY_MICRO
        )
        goto ____switch5_end
    end
    ::____switch5_case_24::
    do
        player:UseCard(Card.CARD_SOUL_SAMSON)
        if hasTarot then
            player:UseCard(Card.CARD_SOUL_SAMSON)
        end
        doSilentGoldenRazor(nil, player, (hasTarot and 2) or 1)
        goto ____switch5_end
    end
    ::____switch5_case_25::
    do
        doJera(nil, player, rand, room, hasTarot)
        goto ____switch5_end
    end
    ::____switch5_case_26::
    do
        spawnCoins(
            nil,
            extMath:randomInt(rand, (hasTarot and 20) or 10, (hasTarot and 50) or 25),
            player.Position,
            rand,
            true,
            true
        )
        goto ____switch5_end
    end
    ::____switch5_case_27::
    do
        player:UseCard(Card.CARD_SOUL_LILITH)
        if hasTarot then
            player:UseCard(Card.CARD_SOUL_LILITH)
        end
        if (not player:HasCollectible(CollectibleType.COLLECTIBLE_BFFS)) and (((rand:RandomFloat() < ((hasTarot and 0.1) or 0.05)) or (player:GetPlayerType() == Isaac.GetPlayerTypeByName("Lilith", false))) or (player:GetPlayerType() == Isaac.GetPlayerTypeByName("Lilith", true))) then
            player:AddCollectible(CollectibleType.COLLECTIBLE_BFFS)
        end
        goto ____switch5_end
    end
    ::____switch5_case_default::
    do
        return false
    end
    ::____switch5_end::
    return true
end
return ____exports
end,
["items.active.upgraded.glowingHeart"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local ____utils = require("utils")
local spawnCoins = ____utils.spawnCoins
local HEALTH_POINTS = 5
local SOUL_COST = 3
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_GLOWINGHEART
end
function ____exports.use(self, _type, rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    if (player:GetPlayerType() == Isaac.GetPlayerTypeByName("Keeper")) or (player:GetPlayerType() == Isaac.GetPlayerTypeByName("Keeper", true)) then
        spawnCoins(
            nil,
            math.ceil(HEALTH_POINTS / 2),
            player.Position,
            rand,
            false,
            true
        )
        return true
    end
    local healAmount = HEALTH_POINTS
    while healAmount > 0 do
        if player:HasFullHearts() then
            if player.Type == PlayerType.PLAYER_BETHANY then
                player:AddSoulCharge(1)
                healAmount = healAmount - SOUL_COST
            elseif player.Type == PlayerType.PLAYER_BETHANY_B then
                player:AddBloodCharge(1)
                healAmount = healAmount - 1
            else
                player:AddSoulHearts(1)
                healAmount = healAmount - SOUL_COST
            end
        else
            player:AddHearts(1)
            healAmount = healAmount - 1
        end
    end
    return true
end
return ____exports
end,
["items.active.upgraded.pillMachine"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_PILLMACHINE
end
function ____exports.use(self, _type, _rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    local currentPillColor = player:GetPill(0)
    if (currentPillColor == nil) or (currentPillColor == PillColor.PILL_NULL) then
        return false
    end
    local currentPillEffect = Game():GetItemPool():GetPillEffect(currentPillColor)
    local isGiant = (currentPillColor & PillColor.PILL_GIANT_FLAG) > 0
    local ____switch5 = currentPillEffect
    if ____switch5 == PillEffect.PILLEFFECT_QUESTIONMARK then
        goto ____switch5_case_0
    elseif ____switch5 == PillEffect.PILLEFFECT_PHEROMONES then
        goto ____switch5_case_1
    elseif ____switch5 == PillEffect.PILLEFFECT_AMNESIA then
        goto ____switch5_case_2
    elseif ____switch5 == PillEffect.PILLEFFECT_PERCS then
        goto ____switch5_case_3
    elseif ____switch5 == PillEffect.PILLEFFECT_ADDICTED then
        goto ____switch5_case_4
    elseif ____switch5 == PillEffect.PILLEFFECT_GULP then
        goto ____switch5_case_5
    elseif ____switch5 == PillEffect.PILLEFFECT_BAD_GAS then
        goto ____switch5_case_6
    elseif ____switch5 == PillEffect.PILLEFFECT_BAD_TRIP then
        goto ____switch5_case_7
    elseif ____switch5 == PillEffect.PILLEFFECT_BALLS_OF_STEEL then
        goto ____switch5_case_8
    elseif ____switch5 == PillEffect.PILLEFFECT_EXPLOSIVE_DIARRHEA then
        goto ____switch5_case_9
    elseif ____switch5 == PillEffect.PILLEFFECT_FULL_HEALTH then
        goto ____switch5_case_10
    elseif ____switch5 == PillEffect.PILLEFFECT_HEALTH_DOWN then
        goto ____switch5_case_11
    elseif ____switch5 == PillEffect.PILLEFFECT_HEALTH_UP then
        goto ____switch5_case_12
    elseif ____switch5 == PillEffect.PILLEFFECT_I_FOUND_PILLS then
        goto ____switch5_case_13
    elseif ____switch5 == PillEffect.PILLEFFECT_PUBERTY then
        goto ____switch5_case_14
    elseif ____switch5 == PillEffect.PILLEFFECT_PRETTY_FLY then
        goto ____switch5_case_15
    elseif ____switch5 == PillEffect.PILLEFFECT_RANGE_DOWN then
        goto ____switch5_case_16
    elseif ____switch5 == PillEffect.PILLEFFECT_RANGE_UP then
        goto ____switch5_case_17
    elseif ____switch5 == PillEffect.PILLEFFECT_SPEED_DOWN then
        goto ____switch5_case_18
    elseif ____switch5 == PillEffect.PILLEFFECT_SPEED_UP then
        goto ____switch5_case_19
    elseif ____switch5 == PillEffect.PILLEFFECT_TEARS_DOWN then
        goto ____switch5_case_20
    elseif ____switch5 == PillEffect.PILLEFFECT_TEARS_UP then
        goto ____switch5_case_21
    elseif ____switch5 == PillEffect.PILLEFFECT_LUCK_DOWN then
        goto ____switch5_case_22
    elseif ____switch5 == PillEffect.PILLEFFECT_LUCK_UP then
        goto ____switch5_case_23
    elseif ____switch5 == PillEffect.PILLEFFECT_TELEPILLS then
        goto ____switch5_case_24
    elseif ____switch5 == PillEffect.PILLEFFECT_48HOUR_ENERGY then
        goto ____switch5_case_25
    elseif ____switch5 == PillEffect.PILLEFFECT_HEMATEMESIS then
        goto ____switch5_case_26
    elseif ____switch5 == PillEffect.PILLEFFECT_PARALYSIS then
        goto ____switch5_case_27
    elseif ____switch5 == PillEffect.PILLEFFECT_SEE_FOREVER then
        goto ____switch5_case_28
    elseif ____switch5 == PillEffect.PILLEFFECT_LEMON_PARTY then
        goto ____switch5_case_29
    elseif ____switch5 == PillEffect.PILLEFFECT_WIZARD then
        goto ____switch5_case_30
    elseif ____switch5 == PillEffect.PILLEFFECT_RELAX then
        goto ____switch5_case_31
    elseif ____switch5 == PillEffect.PILLEFFECT_LARGER then
        goto ____switch5_case_32
    elseif ____switch5 == PillEffect.PILLEFFECT_SMALLER then
        goto ____switch5_case_33
    elseif ____switch5 == PillEffect.PILLEFFECT_INFESTED_EXCLAMATION then
        goto ____switch5_case_34
    elseif ____switch5 == PillEffect.PILLEFFECT_INFESTED_QUESTION then
        goto ____switch5_case_35
    elseif ____switch5 == PillEffect.PILLEFFECT_POWER then
        goto ____switch5_case_36
    elseif ____switch5 == PillEffect.PILLEFFECT_RETRO_VISION then
        goto ____switch5_case_37
    elseif ____switch5 == PillEffect.PILLEFFECT_FRIENDS_TILL_THE_END then
        goto ____switch5_case_38
    elseif ____switch5 == PillEffect.PILLEFFECT_X_LAX then
        goto ____switch5_case_39
    elseif ____switch5 == PillEffect.PILLEFFECT_SOMETHINGS_WRONG then
        goto ____switch5_case_40
    elseif ____switch5 == PillEffect.PILLEFFECT_IM_DROWSY then
        goto ____switch5_case_41
    elseif ____switch5 == PillEffect.PILLEFFECT_IM_EXCITED then
        goto ____switch5_case_42
    elseif ____switch5 == PillEffect.PILLEFFECT_HORF then
        goto ____switch5_case_43
    elseif ____switch5 == PillEffect.PILLEFFECT_SUNSHINE then
        goto ____switch5_case_44
    elseif ____switch5 == PillEffect.PILLEFFECT_VURP then
        goto ____switch5_case_45
    elseif ____switch5 == PillEffect.PILLEFFECT_SHOT_SPEED_DOWN then
        goto ____switch5_case_46
    elseif ____switch5 == PillEffect.PILLEFFECT_SHOT_SPEED_UP then
        goto ____switch5_case_47
    elseif ____switch5 == PillEffect.PILLEFFECT_EXPERIMENTAL then
        goto ____switch5_case_48
    elseif ____switch5 == PillEffect.PILLEFFECT_BOMBS_ARE_KEYS then
        goto ____switch5_case_49
    end
    goto ____switch5_case_default
    ::____switch5_case_0::
    do
        goto ____switch5_end
    end
    ::____switch5_case_1::
    do
    end
    ::____switch5_case_2::
    do
    end
    ::____switch5_case_3::
    do
    end
    ::____switch5_case_4::
    do
    end
    ::____switch5_case_5::
    do
        player:UsePill(currentPillEffect, currentPillColor)
        goto ____switch5_end
    end
    ::____switch5_case_6::
    do
    end
    ::____switch5_case_7::
    do
    end
    ::____switch5_case_8::
    do
    end
    ::____switch5_case_9::
    do
    end
    ::____switch5_case_10::
    do
    end
    ::____switch5_case_11::
    do
    end
    ::____switch5_case_12::
    do
    end
    ::____switch5_case_13::
    do
    end
    ::____switch5_case_14::
    do
    end
    ::____switch5_case_15::
    do
    end
    ::____switch5_case_16::
    do
    end
    ::____switch5_case_17::
    do
    end
    ::____switch5_case_18::
    do
    end
    ::____switch5_case_19::
    do
    end
    ::____switch5_case_20::
    do
    end
    ::____switch5_case_21::
    do
    end
    ::____switch5_case_22::
    do
    end
    ::____switch5_case_23::
    do
    end
    ::____switch5_case_24::
    do
    end
    ::____switch5_case_25::
    do
    end
    ::____switch5_case_26::
    do
    end
    ::____switch5_case_27::
    do
    end
    ::____switch5_case_28::
    do
    end
    ::____switch5_case_29::
    do
    end
    ::____switch5_case_30::
    do
    end
    ::____switch5_case_31::
    do
    end
    ::____switch5_case_32::
    do
    end
    ::____switch5_case_33::
    do
    end
    ::____switch5_case_34::
    do
    end
    ::____switch5_case_35::
    do
    end
    ::____switch5_case_36::
    do
    end
    ::____switch5_case_37::
    do
    end
    ::____switch5_case_38::
    do
    end
    ::____switch5_case_39::
    do
    end
    ::____switch5_case_40::
    do
    end
    ::____switch5_case_41::
    do
    end
    ::____switch5_case_42::
    do
    end
    ::____switch5_case_43::
    do
    end
    ::____switch5_case_44::
    do
    end
    ::____switch5_case_45::
    do
    end
    ::____switch5_case_46::
    do
    end
    ::____switch5_case_47::
    do
    end
    ::____switch5_case_48::
    do
        player:UsePill(currentPillEffect, currentPillColor)
        player:UsePill(currentPillEffect, currentPillColor)
        goto ____switch5_end
    end
    ::____switch5_case_49::
    do
        player:UsePill(currentPillEffect, currentPillColor)
        if isGiant then
            player:UsePill(currentPillEffect, currentPillColor)
        else
            player:AddBombs(1)
            player:AddKeys(1)
        end
        goto ____switch5_end
    end
    ::____switch5_case_default::
    do
        return false
    end
    ::____switch5_end::
    return true
end
return ____exports
end,
["items.active.upgraded.jarOfHeads"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_JAROFHEADS
end
function ____exports.use(self, _type, _rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    player:UseActiveItem(CollectibleType.COLLECTIBLE_BOBS_ROTTEN_HEAD, 0)
    return true
end
return ____exports
end,
["items.active.upgraded.silverNickel"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local extMath = require("extMath")
local ____utils = require("utils")
local spawnCoins = ____utils.spawnCoins
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_SILVERNICKEL
end
function ____exports.use(self, _type, rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    if rand:RandomFloat() < 0.75 then
        local amt = extMath:randomInt(rand, 1, 5)
        if rand:RandomFloat() < 0.1 then
            amt = extMath:randomInt(rand, 5, 10)
            if rand:RandomFloat() < 0.1 then
                amt = extMath:randomInt(rand, 10, 15)
            end
        end
        spawnCoins(nil, amt, player.Position, rand, false, true)
    end
    return true
end
return ____exports
end,
["items.active.upgraded.metalFeather"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local extMath = require("extMath")
local BEAM_COUNT = 7
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_METALFEATHER
end
function ____exports.use(self, _type, rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    local room = Game():GetRoom()
    local targets = {}
    local entities = room:GetEntities()
    do
        local i = 0
        while i < entities.Size do
            do
                local entity = entities:Get(i)
                if entity == nil then
                    goto __continue4
                end
                if not entity:IsVulnerableEnemy() then
                    goto __continue4
                end
                local attackRadius = math.floor(entity.Size * 0.75)
                do
                    local l = 0
                    while l < math.ceil(
                        (entity.HitPoints / 30) + math.floor(
                            rand:RandomFloat() + 0.5
                        )
                    ) do
                        __TS__ArrayPush(
                            targets,
                            entity.Position:__add(
                                Vector(
                                    extMath:randomInt(rand, 0, attackRadius * 2) - attackRadius,
                                    extMath:randomInt(rand, 0, attackRadius * 2) - attackRadius
                                )
                            )
                        )
                        l = l + 1
                    end
                end
            end
            ::__continue4::
            i = i + 1
        end
    end
    if #targets > 0 then
        extMath:shuffleArray(targets)
    end
    do
        local s = 0
        while s < BEAM_COUNT do
            local targetPos = Vector.Zero
            if #targets > 0 then
                targetPos = table.remove(targets)
            else
                targetPos = room:GetRandomPosition(25)
            end
            Isaac.Spawn(EntityType.ENTITY_EFFECT, EffectVariant.CRACK_THE_SKY, 0, targetPos, Vector.Zero, player)
            s = s + 1
        end
    end
    return true
end
return ____exports
end,
["items.active.upgraded.bigBoxOfSpiders"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_BIGBOXOFSPIDERS
end
function ____exports.use(self, _type, _rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    player:UseActiveItem(CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS, UseFlag.USE_NOANIM)
    player:UseActiveItem(CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS, UseFlag.USE_NOANIM)
    return true
end
return ____exports
end,
["items.active.upgraded.bombDispenser"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_BOMBDISPENSER
end
function ____exports.use(self, _type, _rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    local newBomb = Isaac.Spawn(EntityType.ENTITY_BOMBDROP, BombVariant.BOMB_MR_MEGA, BombSubType.BOMB_NORMAL, player.Position, Vector.Zero, player):ToBomb()
    newBomb:AddTearFlags(
        player:GetBombFlags()
    )
    newBomb:SetColor(
        Color(0.7, 0.435, 0.179),
        -1,
        1,
        false,
        false
    )
    if player:HasCollectible(CollectibleType.COLLECTIBLE_MR_MEGA) then
        newBomb.ExplosionDamage = newBomb.ExplosionDamage * 2.7
    else
        newBomb.ExplosionDamage = newBomb.ExplosionDamage * 1.85
    end
    return true
end
return ____exports
end,
["items.active.upgraded.matterRearranger"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local extMath = require("extMath")
local ____utils = require("utils")
local getCoinVal = ____utils.getCoinVal
local spawnPickup = ____utils.spawnPickup
local evaluatePickup, copyWeights, weightedRandomPickup, modifyWeight
function evaluatePickup(self, pickup)
    local ____switch23 = pickup.Variant
    if ____switch23 == PickupVariant.PICKUP_BED then
        goto ____switch23_case_1
    elseif ____switch23 == PickupVariant.PICKUP_BIGCHEST then
        goto ____switch23_case_2
    elseif ____switch23 == PickupVariant.PICKUP_COLLECTIBLE then
        goto ____switch23_case_3
    elseif ____switch23 == PickupVariant.PICKUP_NULL then
        goto ____switch23_case_4
    elseif ____switch23 == PickupVariant.PICKUP_TROPHY then
        goto ____switch23_case_5
    elseif ____switch23 == PickupVariant.PICKUP_THROWABLEBOMB then
        goto ____switch23_case_6
    elseif ____switch23 == PickupVariant.PICKUP_TRINKET then
        goto ____switch23_case_7
    elseif ____switch23 == PickupVariant.PICKUP_HEART then
        goto ____switch23_case_8
    elseif ____switch23 == PickupVariant.PICKUP_KEY then
        goto ____switch23_case_9
    elseif ____switch23 == PickupVariant.PICKUP_BOMB then
        goto ____switch23_case_10
    elseif ____switch23 == PickupVariant.PICKUP_LIL_BATTERY then
        goto ____switch23_case_11
    elseif ____switch23 == PickupVariant.PICKUP_COIN then
        goto ____switch23_case_12
    elseif ____switch23 == PickupVariant.PICKUP_TAROTCARD then
        goto ____switch23_case_13
    elseif ____switch23 == PickupVariant.PICKUP_PILL then
        goto ____switch23_case_14
    elseif ____switch23 == PickupVariant.PICKUP_GRAB_BAG then
        goto ____switch23_case_15
    end
    goto ____switch23_case_default
    ::____switch23_case_default::
    do
    end
    ::____switch23_case_1::
    do
    end
    ::____switch23_case_2::
    do
    end
    ::____switch23_case_3::
    do
    end
    ::____switch23_case_4::
    do
    end
    ::____switch23_case_5::
    do
    end
    ::____switch23_case_6::
    do
    end
    ::____switch23_case_7::
    do
        return 0
    end
    ::____switch23_case_8::
    do
    end
    ::____switch23_case_9::
    do
    end
    ::____switch23_case_10::
    do
    end
    ::____switch23_case_11::
    do
    end
    ::____switch23_case_12::
    do
        return getCoinVal(nil, pickup)
    end
    ::____switch23_case_13::
    do
    end
    ::____switch23_case_14::
    do
    end
    ::____switch23_case_15::
    do
        return getCoinVal(nil, pickup) * 2
    end
    ::____switch23_end::
end
function copyWeights(self, source)
    local out = __TS__New(Map)
    for ____, entry in __TS__Iterator(source) do
        out:set(entry[1], {weight = entry[2].weight, cost = entry[2].cost})
    end
    return out
end
function weightedRandomPickup(self, weights, rand)
    local sum = 0
    for ____, entry in __TS__Iterator(weights) do
        sum = sum + entry[2].weight
    end
    local selection = rand:RandomFloat() * sum
    for ____, entry in __TS__Iterator(weights) do
        if selection < entry[2].weight then
            local newVariant = math.floor(entry[1] / 100)
            return {variant = newVariant, subtype = entry[1] - (newVariant * 100), cost = entry[2].cost}
        end
        selection = selection - entry[2].weight
    end
    return {variant = PickupVariant.PICKUP_COIN, subtype = CoinSubType.COIN_PENNY, cost = 1}
end
function modifyWeight(self, entry, map, spawningData, points)
    local key = entry[1]
    local value = entry[2]
    local variant = math.floor(key / 100)
    local subtype = key - (variant * 100)
    if points < value.cost then
        map:set(key, {weight = 0, cost = value.cost})
        return
    end
    local ____switch32 = variant
    if ____switch32 == PickupVariant.PICKUP_HEART then
        goto ____switch32_case_0
    elseif ____switch32 == PickupVariant.PICKUP_LIL_BATTERY then
        goto ____switch32_case_1
    elseif ____switch32 == PickupVariant.PICKUP_BOMB then
        goto ____switch32_case_2
    elseif ____switch32 == PickupVariant.PICKUP_KEY then
        goto ____switch32_case_3
    elseif ____switch32 == PickupVariant.PICKUP_BOMBCHEST then
        goto ____switch32_case_4
    elseif ____switch32 == PickupVariant.PICKUP_LOCKEDCHEST then
        goto ____switch32_case_5
    elseif ____switch32 == PickupVariant.PICKUP_ETERNALCHEST then
        goto ____switch32_case_6
    end
    goto ____switch32_case_default
    ::____switch32_case_0::
    do
        map:set(
            key,
            {
                weight = value.weight * (1 - extMath:tanh(spawningData.totalHealth / 10)),
                cost = value.cost
            }
        )
        if (spawningData.neededRedHearts <= 0) and (((subtype == HeartSubType.HEART_FULL) or (subtype == HeartSubType.HEART_HALF)) or (subtype == HeartSubType.HEART_DOUBLEPACK)) then
            map:set(key, {weight = 0, cost = value.cost})
        end
        goto ____switch32_end
    end
    ::____switch32_case_1::
    do
        if not spawningData.needsCharge then
            map:set(key, {weight = 0, cost = value.cost})
        end
        goto ____switch32_end
    end
    ::____switch32_case_2::
    do
        if spawningData.hasGoldBomb and (subtype == BombSubType.BOMB_GOLDEN) then
            map:set(key, {weight = 0, cost = value.cost})
        elseif spawningData.hasGoldBomb then
            map:set(key, {weight = value.weight * 0.5, cost = value.cost})
        end
        map:set(
            key,
            {
                weight = value.weight * (1 - extMath:tanh(
                    math.max(spawningData.bombs - 2, 0) / 12
                )),
                cost = value.cost
            }
        )
        goto ____switch32_end
    end
    ::____switch32_case_3::
    do
        if spawningData.hasGoldKey and (subtype == KeySubType.KEY_GOLDEN) then
            map:set(key, {weight = 0, cost = value.cost})
        elseif spawningData.hasGoldKey then
            map:set(key, {weight = value.weight * 0.5, cost = value.cost})
        end
        map:set(
            key,
            {
                weight = value.weight * (1 - extMath:tanh(
                    math.max(spawningData.keys - 2, 0) / 12
                )),
                cost = value.cost
            }
        )
        goto ____switch32_end
    end
    ::____switch32_case_4::
    do
        if spawningData.hasGoldBomb then
            map:set(key, {weight = value.weight * 2, cost = value.cost})
        elseif (spawningData.bombs - spawningData.bombChests) <= 2 then
            map:set(key, {weight = value.weight / 2, cost = value.cost})
        end
        goto ____switch32_end
    end
    ::____switch32_case_5::
    do
        if spawningData.hasGoldKey then
            map:set(key, {weight = value.weight * 2, cost = value.cost})
        elseif (spawningData.keys - spawningData.keyChests) <= 2 then
            map:set(key, {weight = value.weight / 2.5, cost = value.cost})
        end
        goto ____switch32_end
    end
    ::____switch32_case_6::
    do
        if spawningData.hasGoldKey then
            map:set(key, {weight = value.weight * 2.5, cost = value.cost})
        elseif (spawningData.keys - spawningData.keyChests) <= 2 then
            map:set(key, {weight = value.weight / 10, cost = value.cost})
        elseif (spawningData.keys - spawningData.keyChests) <= 6 then
            map:set(key, {weight = value.weight / 3, cost = value.cost})
        end
        goto ____switch32_end
    end
    ::____switch32_case_default::
    do
        goto ____switch32_end
    end
    ::____switch32_end::
end
local VALUE_MULT = 1
local BASE_PICKUP_WEIGHTS = __TS__New(Map, {{(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_FULL, {weight = 400, cost = 3}}, {(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_SOUL, {weight = 30, cost = 5}}, {(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_HALF_SOUL, {weight = 30, cost = 3}}, {(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_HALF, {weight = 600, cost = 1}}, {(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_DOUBLEPACK, {weight = 200, cost = 6}}, {(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_BLENDED, {weight = 15, cost = 6}}, {(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_BONE, {weight = 6, cost = 9}}, {(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_ETERNAL, {weight = 15, cost = 7}}, {(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_BLACK, {weight = 10, cost = 7}}, {(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_GOLDEN, {weight = 10, cost = 4}}, {(PickupVariant.PICKUP_HEART * 100) + HeartSubType.HEART_ROTTEN, {weight = 5, cost = 2}}, {(PickupVariant.PICKUP_BOMB * 100) + BombSubType.BOMB_NORMAL, {weight = 100, cost = 5}}, {(PickupVariant.PICKUP_BOMB * 100) + BombSubType.BOMB_DOUBLEPACK, {weight = 50, cost = 10}}, {(PickupVariant.PICKUP_BOMB * 100) + BombSubType.BOMB_GOLDEN, {weight = 10, cost = 25}}, {(PickupVariant.PICKUP_BOMB * 100) + BombSubType.BOMB_GIGA, {weight = 4, cost = 16}}, {(PickupVariant.PICKUP_BOMB * 100) + BombSubType.BOMB_TROLL, {weight = 15, cost = -2}}, {(PickupVariant.PICKUP_BOMB * 100) + BombSubType.BOMB_SUPERTROLL, {weight = 7.5, cost = -5}}, {(PickupVariant.PICKUP_BOMB * 100) + BombSubType.BOMB_GOLDENTROLL, {weight = 2, cost = -20}}, {(PickupVariant.PICKUP_KEY * 100) + KeySubType.KEY_NORMAL, {weight = 100, cost = 5}}, {(PickupVariant.PICKUP_KEY * 100) + KeySubType.KEY_DOUBLEPACK, {weight = 50, cost = 10}}, {(PickupVariant.PICKUP_KEY * 100) + KeySubType.KEY_CHARGED, {weight = 33, cost = 10}}, {(PickupVariant.PICKUP_KEY * 100) + KeySubType.KEY_GOLDEN, {weight = 10, cost = 25}}, {(PickupVariant.PICKUP_LIL_BATTERY * 100) + BatterySubType.BATTERY_NORMAL, {weight = 100, cost = 5}}, {(PickupVariant.PICKUP_LIL_BATTERY * 100) + BatterySubType.BATTERY_MICRO, {weight = 50, cost = 2}}, {(PickupVariant.PICKUP_LIL_BATTERY * 100) + BatterySubType.BATTERY_MEGA, {weight = 50, cost = 12}}, {(PickupVariant.PICKUP_LIL_BATTERY * 100) + BatterySubType.BATTERY_GOLDEN, {weight = 10, cost = 25}}, {(PickupVariant.PICKUP_CHEST * 100) + ChestSubType.CHEST_CLOSED, {weight = 30, cost = 9}}, {(PickupVariant.PICKUP_BOMBCHEST * 100) + ChestSubType.CHEST_CLOSED, {weight = 20, cost = 12}}, {(PickupVariant.PICKUP_LOCKEDCHEST * 100) + ChestSubType.CHEST_CLOSED, {weight = 20, cost = 12}}, {(PickupVariant.PICKUP_REDCHEST * 100) + ChestSubType.CHEST_CLOSED, {weight = 10, cost = 16}}, {(PickupVariant.PICKUP_ETERNALCHEST * 100) + ChestSubType.CHEST_CLOSED, {weight = 8, cost = 21}}, {(PickupVariant.PICKUP_GRAB_BAG * 100) + SackSubType.SACK_NORMAL, {weight = 33, cost = 7}}})
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_MATTERREARRANGER
end
function ____exports.use(self, _type, rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    local room = Game():GetRoom()
    local entities = room:GetEntities()
    local points = 0
    do
        local i = 0
        while i < entities.Size do
            do
                local entity = entities:Get(i)
                if entity == nil then
                    goto __continue4
                end
                if entity.Type ~= EntityType.ENTITY_PICKUP then
                    goto __continue4
                end
                local pickupValue = evaluatePickup(
                    nil,
                    entity:ToPickup()
                )
                if pickupValue > 0 then
                    points = points + pickupValue
                    entity:Remove()
                end
            end
            ::__continue4::
            i = i + 1
        end
    end
    points = points * VALUE_MULT
    local spawningData = {
        neededRedHearts = player:GetEffectiveMaxHearts() - player:GetHearts(),
        totalHealth = player.HitPoints,
        needsCharge = ((player:NeedsCharge() or player:NeedsCharge(ActiveSlot.SLOT_SECONDARY)) or player:NeedsCharge(ActiveSlot.SLOT_POCKET)) or player:NeedsCharge(ActiveSlot.SLOT_POCKET2),
        bombs = player:GetNumBombs(),
        hasGoldBomb = player:HasGoldenBomb(),
        keys = player:GetNumKeys(),
        hasGoldKey = player:HasGoldenKey(),
        bombChests = 0,
        keyChests = 0
    }
    while points > 0 do
        local pickupWeights = copyWeights(nil, BASE_PICKUP_WEIGHTS)
        for ____, entry in __TS__Iterator(pickupWeights) do
            modifyWeight(nil, entry, pickupWeights, spawningData, points)
        end
        local result = weightedRandomPickup(nil, pickupWeights, rand)
        points = points - result.cost
        if (result.variant == PickupVariant.PICKUP_BOMB) and (((result.subtype == BombSubType.BOMB_TROLL) or (result.subtype == BombSubType.BOMB_SUPERTROLL)) or (result.subtype == BombSubType.BOMB_GOLDENTROLL)) then
            spawnPickup(
                nil,
                player.Position + Vector(
                    extMath:randomSign(rand) * 50,
                    extMath:randomSign(rand) * 50
                ),
                rand,
                result.variant,
                result.subtype,
                true
            )
        else
            spawnPickup(nil, player.Position, rand, result.variant, result.subtype, true)
        end
        local ____switch12 = result.variant
        if ____switch12 == PickupVariant.PICKUP_HEART then
            goto ____switch12_case_1
        elseif ____switch12 == PickupVariant.PICKUP_LIL_BATTERY then
            goto ____switch12_case_2
        elseif ____switch12 == PickupVariant.PICKUP_LOCKEDCHEST then
            goto ____switch12_case_3
        elseif ____switch12 == PickupVariant.PICKUP_BOMBCHEST then
            goto ____switch12_case_4
        elseif ____switch12 == PickupVariant.PICKUP_KEY then
            goto ____switch12_case_5
        elseif ____switch12 == PickupVariant.PICKUP_BOMB then
            goto ____switch12_case_6
        end
        goto ____switch12_case_default
        ::____switch12_case_default::
        do
        end
        ::____switch12_case_1::
        do
            local ____switch13 = result.subtype
            if ____switch13 == HeartSubType.HEART_FULL then
                goto ____switch13_case_0
            elseif ____switch13 == HeartSubType.HEART_HALF then
                goto ____switch13_case_1
            elseif ____switch13 == HeartSubType.HEART_DOUBLEPACK then
                goto ____switch13_case_2
            elseif ____switch13 == HeartSubType.HEART_BLENDED then
                goto ____switch13_case_3
            elseif ____switch13 == HeartSubType.HEART_BLACK then
                goto ____switch13_case_4
            elseif ____switch13 == HeartSubType.HEART_SOUL then
                goto ____switch13_case_5
            elseif ____switch13 == HeartSubType.HEART_ETERNAL then
                goto ____switch13_case_6
            elseif ____switch13 == HeartSubType.HEART_BONE then
                goto ____switch13_case_7
            elseif ____switch13 == HeartSubType.HEART_HALF_SOUL then
                goto ____switch13_case_8
            elseif ____switch13 == HeartSubType.HEART_ROTTEN then
                goto ____switch13_case_9
            end
            goto ____switch13_case_default
            ::____switch13_case_0::
            do
                spawningData.totalHealth = spawningData.totalHealth + math.min(2, spawningData.neededRedHearts)
                spawningData.neededRedHearts = spawningData.neededRedHearts - 2
                goto ____switch13_end
            end
            ::____switch13_case_1::
            do
                spawningData.totalHealth = spawningData.totalHealth + math.min(1, spawningData.neededRedHearts)
                spawningData.neededRedHearts = spawningData.neededRedHearts - 1
                goto ____switch13_end
            end
            ::____switch13_case_2::
            do
                spawningData.totalHealth = spawningData.totalHealth + math.min(4, spawningData.neededRedHearts)
                spawningData.neededRedHearts = spawningData.neededRedHearts - 4
                goto ____switch13_end
            end
            ::____switch13_case_3::
            do
                if spawningData.neededRedHearts > 0 then
                    spawningData.totalHealth = spawningData.totalHealth + math.min(2, spawningData.neededRedHearts)
                    spawningData.neededRedHearts = spawningData.neededRedHearts - 2
                else
                    spawningData.totalHealth = spawningData.totalHealth + 2
                end
                goto ____switch13_end
            end
            ::____switch13_case_4::
            do
            end
            ::____switch13_case_5::
            do
            end
            ::____switch13_case_6::
            do
                spawningData.totalHealth = spawningData.totalHealth + 2
                goto ____switch13_end
            end
            ::____switch13_case_7::
            do
                spawningData.neededRedHearts = spawningData.neededRedHearts + 2
            end
            ::____switch13_case_8::
            do
            end
            ::____switch13_case_9::
            do
                spawningData.totalHealth = spawningData.totalHealth + 1
                goto ____switch13_end
            end
            ::____switch13_case_default::
            do
                goto ____switch13_end
            end
            ::____switch13_end::
            goto ____switch12_end
        end
        ::____switch12_case_2::
        do
            local ____switch16 = result.subtype
            if ____switch16 == BatterySubType.BATTERY_MICRO then
                goto ____switch16_case_0
            elseif ____switch16 == BatterySubType.BATTERY_NORMAL then
                goto ____switch16_case_1
            elseif ____switch16 == BatterySubType.BATTERY_MEGA then
                goto ____switch16_case_2
            elseif ____switch16 == BatterySubType.BATTERY_GOLDEN then
                goto ____switch16_case_3
            end
            goto ____switch16_case_default
            ::____switch16_case_0::
            do
                if rand:RandomFloat() > 0.5 then
                    goto ____switch16_end
                end
            end
            ::____switch16_case_1::
            do
            end
            ::____switch16_case_2::
            do
            end
            ::____switch16_case_3::
            do
                spawningData.needsCharge = false
                goto ____switch16_end
            end
            ::____switch16_case_default::
            do
                goto ____switch16_end
            end
            ::____switch16_end::
            goto ____switch12_end
        end
        ::____switch12_case_3::
        do
            spawningData.keyChests = spawningData.keyChests + 1
            goto ____switch12_end
        end
        ::____switch12_case_4::
        do
            spawningData.bombChests = spawningData.bombChests + 1
            goto ____switch12_end
        end
        ::____switch12_case_5::
        do
            if result.subtype == KeySubType.KEY_GOLDEN then
                spawningData.hasGoldKey = true
            else
                spawningData.keys = spawningData.keys + 1
            end
            goto ____switch12_end
        end
        ::____switch12_case_6::
        do
            if result.subtype == BombSubType.BOMB_GOLDEN then
                spawningData.hasGoldBomb = true
            else
                spawningData.bombs = spawningData.bombs + 1
            end
            goto ____switch12_end
        end
        ::____switch12_end::
    end
    return true
end
return ____exports
end,
["items.active.upgraded.forgetMeLater"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local ____utils = require("utils")
local playSound = ____utils.playSound
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_FORGETMELATER
end
function ____exports.use(self, _type, _rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    player:UseActiveItem(CollectibleType.COLLECTIBLE_FORGET_ME_NOW, UseFlag.USE_NOANIM)
    return true
end
function ____exports.preClean(self, _rand, _SpawnPosition)
    local room = Game():GetRoom()
    local player = Isaac.GetPlayer(0)
    local p = 0
    while (player ~= nil) and (p < 4) do
        if player:HasCollectible(
            ____exports.ownType(nil),
            true
        ) then
            local charges = 1
            if ((((room:GetRoomShape() == RoomShape.ROOMSHAPE_2x2) or (room:GetRoomShape() == RoomShape.ROOMSHAPE_LTL)) or (room:GetRoomShape() == RoomShape.ROOMSHAPE_LTR)) or (room:GetRoomShape() == RoomShape.ROOMSHAPE_LBL)) or (room:GetRoomShape() == RoomShape.ROOMSHAPE_LBR) then
                charges = 2
            end
            do
                local s = 0
                while s < ActiveSlot.SLOT_POCKET2 do
                    do
                        if player:GetActiveItem(s) ~= ____exports.ownType(nil) then
                            goto __continue8
                        end
                        while charges > 0 do
                            if player:GetActiveCharge(s) < 30 then
                                player:SetActiveCharge(
                                    player:GetActiveCharge(s) + 1,
                                    s
                                )
                                charges = charges - 1
                                playSound(nil, SoundEffect.SOUND_BATTERYCHARGE)
                            else
                                break
                            end
                        end
                    end
                    ::__continue8::
                    s = s + 1
                end
            end
        end
        player = Isaac.GetPlayer(
            (function()
                local ____tmp = p
                p = ____tmp + 1
                return ____tmp
            end)()
        )
    end
    return nil
end
return ____exports
end,
["items.active.upgraded.bloodSaw"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local BASE_DAMAGE = 80
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_BLOODSAW
end
function ____exports.use(self, _type, _rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    local cost = (player:HasCollectible(CollectibleType.COLLECTIBLE_WAFER) and 1) or 2
    while cost > 0 do
        if player:GetRottenHearts() > 0 then
            player:AddRottenHearts(-1)
        elseif player:GetHearts() > 0 then
            player:AddHearts(-1)
        elseif player:GetSoulHearts() > 0 then
            player:AddSoulHearts(-1)
        elseif player:GetBoneHearts() > 0 then
            player:AddBoneHearts(-1)
        end
        cost = cost - 1
    end
    player:TakeDamage(
        2,
        DamageFlag.DAMAGE_FAKE,
        EntityRef(player),
        0
    )
    local damageMult = 1
    if player:HasCollectible(CollectibleType.COLLECTIBLE_MISSING_PAGE_2) then
        damageMult = damageMult + 1
    end
    if player:HasTrinket(TrinketType.TRINKET_MISSING_PAGE) then
        damageMult = damageMult + 1
    end
    local entities = Game():GetRoom():GetEntities()
    do
        local i = 0
        while i < entities.Size do
            do
                local entity = entities:Get(i)
                if entity == nil then
                    goto __continue11
                end
                if not entity:IsActiveEnemy(false) then
                    goto __continue11
                end
                if entity:IsInvincible() then
                    goto __continue11
                end
                entity:TakeDamage(
                    BASE_DAMAGE * damageMult,
                    DamageFlag.DAMAGE_IGNORE_ARMOR,
                    EntityRef(player),
                    0
                )
            end
            ::__continue11::
            i = i + 1
        end
    end
    return true
end
return ____exports
end,
["items.active.upgraded.divinityGenerator"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_DIVINITYGENERATOR
end
function ____exports.use(self, _type, _rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    player:UseActiveItem(CollectibleType.COLLECTIBLE_PRAYER_CARD)
    return true
end
return ____exports
end,
["items.active.upgraded.satanityGenerator"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_SATANITYGENERATOR
end
function ____exports.use(self, _type, _rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    player:UseActiveItem(CollectibleType.COLLECTIBLE_SATANIC_BIBLE)
    return true
end
return ____exports
end,
["main"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local EFF_DigitalCard = require("items.active.upgraded.digitalCard")
local EFF_CartographersTome = require("items.active.upgraded.cartographersTome")
local EFF_AnarchistsEBook = require("items.active.upgraded.anarchistsEBook")
local EFF_SHADOWDEVICE = require("items.active.upgraded.shadowDevice")
local EFF_CHESTOFSIN = require("items.active.upgraded.chestOfSin")
local EFF_RUNICAMPLIFIER = require("items.active.upgraded.runicAmplifier")
local EFF_GLOWINGHEART = require("items.active.upgraded.glowingHeart")
local EFF_PILLMACHINE = require("items.active.upgraded.pillMachine")
local EFF_JAROFHEADS = require("items.active.upgraded.jarOfHeads")
local EFF_SILVERNICKEL = require("items.active.upgraded.silverNickel")
local EFF_METALFEATHER = require("items.active.upgraded.metalFeather")
local EFF_BIGBOXOFSPIDERS = require("items.active.upgraded.bigBoxOfSpiders")
local EFF_BOMBDISPENSER = require("items.active.upgraded.bombDispenser")
local EFF_MATTERREARRANGER = require("items.active.upgraded.matterRearranger")
local EFF_FORGETMELATER = require("items.active.upgraded.forgetMeLater")
local EFF_BLOODSAW = require("items.active.upgraded.bloodSaw")
local EFF_DIVINITYGENERATOR = require("items.active.upgraded.divinityGenerator")
local EFF_SATANITYGENERATOR = require("items.active.upgraded.satanityGenerator")
local ____utils = require("utils")
local randomCollectible = ____utils.randomCollectible
local ABANDONED_LABORATORY = RegisterMod("Abandoned_Laboratory", 1)
local USER_TEST = true
local function postGameStarted(self, isContinued)
    if (not isContinued) and USER_TEST then
        local rand = RNG()
        rand:SetSeed(
            Game():GetSeeds():GetStartSeed(),
            0
        )
        local collectible = randomCollectible(nil, rand)
        Isaac.Spawn(
            EntityType.ENTITY_PICKUP,
            PickupVariant.PICKUP_COLLECTIBLE,
            collectible,
            Game():GetRoom():GetCenterPos(),
            Vector.Zero,
            nil
        )
    end
end
ABANDONED_LABORATORY:AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_DigitalCard.use,
    EFF_DigitalCard:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_CartographersTome.use,
    EFF_CartographersTome:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_AnarchistsEBook.use,
    EFF_AnarchistsEBook:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_SHADOWDEVICE.use,
    EFF_SHADOWDEVICE:ownType()
)
ABANDONED_LABORATORY:AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, EFF_SHADOWDEVICE.interceptDamage, EntityType.ENTITY_PLAYER)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_CHESTOFSIN.use,
    EFF_CHESTOFSIN:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_RUNICAMPLIFIER.use,
    EFF_RUNICAMPLIFIER:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_GLOWINGHEART.use,
    EFF_GLOWINGHEART:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_PILLMACHINE.use,
    EFF_PILLMACHINE:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_JAROFHEADS.use,
    EFF_JAROFHEADS:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_SILVERNICKEL.use,
    EFF_SILVERNICKEL:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_METALFEATHER.use,
    EFF_METALFEATHER:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_BIGBOXOFSPIDERS.use,
    EFF_BIGBOXOFSPIDERS:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_BOMBDISPENSER.use,
    EFF_BOMBDISPENSER:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_MATTERREARRANGER.use,
    EFF_MATTERREARRANGER:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_FORGETMELATER.use,
    EFF_FORGETMELATER:ownType()
)
ABANDONED_LABORATORY:AddCallback(ModCallbacks.MC_PRE_SPAWN_CLEAN_AWARD, EFF_FORGETMELATER.preClean)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_BLOODSAW.use,
    EFF_BLOODSAW:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_DIVINITYGENERATOR.use,
    EFF_DIVINITYGENERATOR:ownType()
)
ABANDONED_LABORATORY:AddCallback(
    ModCallbacks.MC_USE_ITEM,
    EFF_SATANITYGENERATOR.use,
    EFF_SATANITYGENERATOR:ownType()
)
Isaac.DebugString("Abandoned_Laboratory initialized.")
return ____exports
end,
["saveData"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
end,
["items.active.specialized.goldenNickel"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local CollectibleTypeLab = ____constants.CollectibleTypeLab
local extMath = require("extMath")
local ____utils = require("utils")
local spawnCoins = ____utils.spawnCoins
function ____exports.ownType(self)
    return CollectibleTypeLab.COLLECTIBLE_SILVERNICKEL
end
function ____exports.use(self, _type, rand, player, _UseFlags, _ActiveSlot, _CustomVarData)
    if rand:RandomFloat() < 0.75 then
        local amt = extMath:randomInt(rand, 1, 5)
        if rand:RandomFloat() < 0.25 then
            amt = extMath:randomInt(rand, 5, 10)
            if rand:RandomFloat() < 0.25 then
                amt = extMath:randomInt(rand, 10, 15)
            end
        end
        spawnCoins(nil, amt, player.Position, rand, false, true)
    end
    return true
end
return ____exports
end,
}
return require("main")
