@extends('layout')

@section('content')

    <div id="primary" class="content-area">
        <main id="main" class="site-main">
            <c-customer-create></c-customer-create>
        </main>
    </div>
    <vue-snotify></vue-snotify>

@stop
