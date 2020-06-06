@extends('layout')

@section('content')

    <c-breadcrumb></c-breadcrumb>
    <div id="primary" class="content-area">
        <main id="main" class="site-main">
            <c-product-detail sku="{{$sku}}"></c-product-detail>
        </main>
    </div>
    <vue-snotify></vue-snotify>

@stop
